import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, Loader2 } from "lucide-react";

const TRAINING_CONFIG = {
  id: "3997",
  name: "Inscrição UP Day - Outubro 2026",
  businessUnit: "InstitutoUP",
  leadSector: "instituto_up",
  leadOrigin: "up_day_plus",
  leadProduct: "UP Day Plus",
  leadEntry: "InstitutoUP / UP Day Plus",
  dateDisplay: "24/10 e 07/11",
  dateLong: "24 de Outubro e 07 de Novembro de 2026",
  startISO: "2026-10-24T08:59:00-03:00",
  endISO: "2026-11-07T18:00:00-03:00",
  whatsappNumber: "551120901412",
  whatsappMessage:
    "Olá! Acabei de concluir minha inscrição do UP Day Outubro 2026 e gostaria de falar com a equipe.",
};

const INSCRICAO_URL = "/api/inscricao";
const FORM_DATA_KEY = "instituto-up-inscricao-outubro-2026";
const FORM_STEP_KEY = "instituto-up-inscricao-outubro-2026-step";
const TOTAL_STEPS = 7;

const STEP_TITLES = [
  "Identificação",
  "Contato",
  "Perfil",
  "Experiência",
  "Pagamento",
  "Termos finais",
  "Cupom e pagamento",
];

type FormData = Record<string, string>;
type FormErrors = Record<string, string>;
type CouponResult = {
  informado: boolean;
  aplicado: boolean;
  codigo: string;
  motivo: "" | "invalido" | "expirado" | "esgotado";
};
type SubmissionResult = { ok?: boolean; cupom?: CouponResult };
function onlyDigits(value: string) {
  return String(value || "").replace(/\D/g, "");
}

function maskPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d{4})(\d{0,4})/, (_, ddd, p1, p2) => `(${ddd}) ${p1}${p2 ? "-" + p2 : ""}`)
      .trim();
  }
  return digits
    .replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, (_, ddd, n9, p1, p2) => `(${ddd}) ${n9}${p1}${p2 ? "-" + p2 : ""}`)
    .trim();
}

function maskCpf(value: string) {
  return onlyDigits(value)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function validatePhone(value: string) {
  const digits = onlyDigits(value);
  if (!(digits.length === 10 || digits.length === 11)) {
    return "Informe um telefone com DDD válido.";
  }
  if (digits.length === 11 && digits[2] !== "9") {
    return "Telefones com 11 dígitos precisam iniciar com 9 após o DDD.";
  }
  return "";
}

function validateCpf(value: string) {
  const digits = onlyDigits(value);
  if (digits.length !== 11) return "Informe um CPF com 11 dígitos.";
  if (/^(\d)\1+$/.test(digits)) return "Informe um CPF válido.";

  let sum = 0;
  for (let i = 0; i < 9; i += 1) sum += Number(digits[i]) * (10 - i);
  let first = (sum * 10) % 11;
  if (first === 10) first = 0;
  if (first !== Number(digits[9])) return "Informe um CPF válido.";

  sum = 0;
  for (let i = 0; i < 10; i += 1) sum += Number(digits[i]) * (11 - i);
  let second = (sum * 10) % 11;
  if (second === 10) second = 0;
  if (second !== Number(digits[10])) return "Informe um CPF válido.";

  return "";
}

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Informe um e-mail válido.";
}

function validateBirthDate(value: string) {
  if (!value) return "Informe sua data de nascimento.";
  const birthDate = new Date(`${value}T00:00:00`);
  const eventDate = new Date(TRAINING_CONFIG.startISO);
  if (Number.isNaN(birthDate.getTime()) || birthDate > eventDate) {
    return "Informe uma data de nascimento válida.";
  }

  let age = eventDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = eventDate.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && eventDate.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  if (age < 18) return "A inscrição é permitida apenas para maiores de 18 anos.";
  return "";
}

function normalizeText(value: unknown) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function toTitleCase(value: string) {
  const lowercaseWords = new Set(["da", "de", "do", "das", "dos", "e"]);
  return normalizeText(value)
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word, index) => {
      if (index > 0 && lowercaseWords.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function normalizeUf(value: string) {
  return normalizeText(value).replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();
}

function parseBoolean(value: string | null) {
  if (!value) return false;
  return ["1", "true", "yes", "sim"].includes(value.toLowerCase());
}

function collectTracking(params: URLSearchParams) {
  return {
    plan: params.get("plan") || "",
    source: params.get("source") || "",
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    traffic_source:
      params.get("traffic_source") || params.get("source") || params.get("utm_source") || "",
    page: window.location.href,
    referrer: document.referrer || "",
    from_bio: parseBoolean(params.get("from_bio")),
    is_whatsapp_traffic:
      parseBoolean(params.get("is_whatsapp_traffic")) ||
      /whatsapp/i.test(params.get("utm_source") || ""),
    is_bio_traffic:
      parseBoolean(params.get("is_bio_traffic")) || /bio/i.test(params.get("utm_source") || ""),
    audience_segment: params.get("audience_segment") || "",
  };
}

function normalizePayloadValues(payload: Record<string, unknown>) {
  const normalized: Record<string, unknown> = { ...payload };
  ["nome", "nome_social", "indicacao"].forEach((key) => {
    if (typeof normalized[key] === "string") normalized[key] = toTitleCase(normalized[key] as string);
  });
  if (typeof normalized.cidade === "string") normalized.cidade = toTitleCase(normalized.cidade);
  if (typeof normalized.estado === "string") normalized.estado = normalizeUf(normalized.estado);
  if (typeof normalized.profissao_area === "string") {
    normalized.profissao_area = normalizeText(normalized.profissao_area);
  }
  ["telefone", "contato_emergencia"].forEach((key) => {
    if (typeof normalized[key] === "string") normalized[key] = onlyDigits(normalized[key] as string);
  });
  if (normalized.cidade && normalized.estado) {
    normalized.cidade_estado = `${normalized.cidade} - ${normalized.estado}`;
  }
  return normalized;
}

const inputClass =
  "w-full rounded-xl border border-gray-700 bg-black/40 px-4 py-3.5 text-base text-white placeholder:text-gray-500 focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/40 transition-colors";

const InscriptionForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<CouponResult | null>(null);
  const [checkingCoupon, setCheckingCoupon] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const clientId = useMemo(
    () =>
      window.crypto && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()),
    []
  );
  const tracking = useMemo(() => collectTracking(new URLSearchParams(window.location.search)), []);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(FORM_DATA_KEY);
      const savedStep = localStorage.getItem(FORM_STEP_KEY);
      if (savedData) setData(JSON.parse(savedData));
      if (savedStep) setCurrentStep(Math.min(Number(savedStep) || 0, TOTAL_STEPS - 1));
    } catch (error) {
      console.error("Erro ao restaurar progresso:", error);
    }
  }, []);

  const saveProgress = (nextData: FormData, nextStep: number) => {
    try {
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify(nextData));
      localStorage.setItem(FORM_STEP_KEY, String(nextStep));
    } catch (error) {
      console.error("Erro ao salvar progresso:", error);
    }
  };

  const clearProgress = () => {
    try {
      localStorage.removeItem(FORM_DATA_KEY);
      localStorage.removeItem(FORM_STEP_KEY);
    } catch (error) {
      console.error("Erro ao limpar progresso:", error);
    }
  };

  const setField = (name: string, value: string) => {
    if (name === "cupom") setCouponFeedback(null);
    if (name === "tem_cupom" && value === "Não") setCouponFeedback(null);
    setData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "tem_cupom" && value === "Não") next.cupom = "";
      saveProgress(next, currentStep);
      return next;
    });
    setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  };

  const get = (name: string) => (data[name] || "").trim();

  const validateStep = (step: number) => {
    const nextErrors: FormErrors = {};

    const require = (name: string, label: string, minLength = 1) => {
      const value = get(name);
      if (!value || value.length < minLength) nextErrors[name] = `Informe ${label}.`;
      return value;
    };

    switch (step) {
      case 0: {
        require("nome", "seu nome completo", 3);
        if (get("usa_nome_social") === "Sim" && get("nome_social").length < 2) {
          nextErrors.nome_social = "Informe seu nome social.";
        }
        require("rg", "seu RG", 5);
        const cpfError = validateCpf(get("cpf"));
        if (cpfError) nextErrors.cpf = cpfError;
        break;
      }
      case 1: {
        require("endereco", "seu endereço", 5);
        require("cidade", "a cidade onde reside", 2);
        require("estado", "o estado onde reside", 2);
        const emailError = validateEmail(get("email"));
        if (emailError) nextErrors.email = emailError;
        const phoneError = validatePhone(get("telefone"));
        if (phoneError) nextErrors.telefone = phoneError;
        const emergencyError = validatePhone(get("contato_emergencia"));
        if (emergencyError) nextErrors.contato_emergencia = emergencyError;
        break;
      }
      case 2: {
        const birthError = validateBirthDate(get("data_nascimento"));
        if (birthError) nextErrors.data_nascimento = birthError;
        require("profissao_area", "sua profissão", 2);
        if (!get("estado_civil")) nextErrors.estado_civil = "Selecione seu estado civil.";
        if (get("estado_civil") === "Outro" && !get("estado_civil_outro")) {
          nextErrors.estado_civil = "Informe seu estado civil no campo outro.";
        }
        break;
      }
      case 3: {
        require("indicacao", "quem te indicou", 2);
        if (!get("tamanho_camiseta")) {
          nextErrors.tamanho_camiseta = "Selecione o tamanho da camiseta.";
        }
        break;
      }
      case 5: {
        if (get("multa_ciente") !== "Declaro estar ciente da taxa.") {
          nextErrors.multa_ciente = "Confirme que está ciente da taxa.";
        }
        if (get("cancelamento_ciente") !== "Concordo com o termo acima.") {
          nextErrors.cancelamento_ciente = "Confirme que concorda com o termo.";
        }
        break;
      }
      case 6: {
        if (!get("tem_cupom")) {
          nextErrors.tem_cupom = "Escolha se você tem um cupom.";
        }
        if (get("tem_cupom") === "Sim" && get("cupom").length < 3) {
          nextErrors.cupom = "Digite o código do cupom.";
        }
        break;
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const sendStepPayload = async (isFinal: boolean): Promise<SubmissionResult | null> => {
    const stepData = isFinal
      ? {
          ...data,
          pagamento_info_visualizada: "PIX CNPJ 24.964.964/0001-18 - RODRIGO DAMACENO PEREIRA",
        }
      : data;

    const payload = normalizePayloadValues({
      clientId,
      timestamp: new Date().toISOString(),
      data_preenchimento: new Date().toLocaleString("pt-BR"),
      treinamento: TRAINING_CONFIG.id,
      treinamento_id: TRAINING_CONFIG.id,
      training_id: TRAINING_CONFIG.id,
      treinamento_nome: TRAINING_CONFIG.name,
      unidade_negocio: TRAINING_CONFIG.businessUnit,
      lead_setor: TRAINING_CONFIG.leadSector,
      lead_origem: TRAINING_CONFIG.leadOrigin,
      lead_produto: TRAINING_CONFIG.leadProduct,
      lead_entrada: TRAINING_CONFIG.leadEntry,
      entrada_sinal: TRAINING_CONFIG.leadEntry,
      produto_interesse: TRAINING_CONFIG.leadProduct,
      origem_formulario: window.location.href,
      dashboard_tags: [
        `Setor: ${TRAINING_CONFIG.businessUnit}`,
        `Entrada: ${TRAINING_CONFIG.leadProduct}`,
        `Treinamento: ${TRAINING_CONFIG.name}`,
      ],
      data_treinamento: TRAINING_CONFIG.dateDisplay,
      data_treinamento_extenso: TRAINING_CONFIG.dateLong,
      treinamento_inicio: TRAINING_CONFIG.startISO,
      treinamento_fim: TRAINING_CONFIG.endISO,
      _step: currentStep + 1,
      _final: isFinal,
      ...tracking,
      ...stepData,
    });

    try {
      const response = await fetch(INSCRICAO_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        keepalive: isFinal,
      });

      if (!response.ok && response.type !== "opaque") {
        let details = "";
        try {
          const errorBody = await response.json();
          details = errorBody?.details || errorBody?.error || "";
        } catch {
          /* corpo não-JSON */
        }
        throw new Error(`HTTP ${response.status}${details ? ` - ${details}` : ""}`);
      }
      return (await response.json().catch(() => ({}))) as SubmissionResult;
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error);
      setStatusMessage("Erro de conexão. Tente novamente.");
      return null;
    }
  };

  const couponMessage = (coupon: CouponResult | null) => {
    if (!coupon) return "";
    if (coupon.aplicado) return `Cupom ${coupon.codigo} válido! Sua inscrição fica sem custo — é só finalizar.`;
    if (coupon.motivo === "expirado") return "Este cupom expirou.";
    if (coupon.motivo === "esgotado") return "Este cupom já atingiu o limite de usos.";
    return "Cupom não encontrado. Confira o código.";
  };

  const checkCoupon = async () => {
    const rawCoupon = get("cupom");
    if (rawCoupon.length < 3) {
      setErrors((prev) => ({ ...prev, cupom: "Digite o código do cupom." }));
      return;
    }

    setCheckingCoupon(true);
    setCouponFeedback(null);
    try {
      const response = await fetch(INSCRICAO_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _action: "validarCupom", cupom: rawCoupon }),
      });
      const result = (await response.json().catch(() => ({}))) as SubmissionResult;
      const coupon = result.cupom || {
        informado: true,
        aplicado: false,
        codigo: rawCoupon,
        motivo: "invalido" as const,
      };
      if (coupon.aplicado) setField("cupom", coupon.codigo);
      setCouponFeedback(coupon);
    } catch (error) {
      console.error("Erro ao verificar cupom:", error);
      setCouponFeedback({ informado: true, aplicado: false, codigo: rawCoupon, motivo: "invalido" });
    } finally {
      setCheckingCoupon(false);
    }
  };

  const showCheckoutHandoff = (coupon?: CouponResult) => {
    const completedName = get("nome_social") || get("nome");
    try {
      sessionStorage.setItem(
        "up-day:inscricaoConcluida",
        JSON.stringify({ nome: completedName, em: new Date().toISOString() }),
      );
    } catch (error) {
      console.error("Erro ao guardar o nome da inscrição:", error);
    }

    if (coupon?.aplicado && coupon.codigo) {
      try {
        sessionStorage.setItem(
          "up-day:cupomAplicado",
          JSON.stringify({ codigo: coupon.codigo, nome: completedName, em: new Date().toISOString() })
        );
      } catch (error) {
        console.error("Erro ao guardar cupom aplicado:", error);
      }
      window.location.href = `/checkout-cupom.html?cupom=${encodeURIComponent(coupon.codigo)}`;
      return;
    }

    const reason = coupon?.informado && coupon.motivo ? `?motivo=${encodeURIComponent(coupon.motivo)}` : "";
    window.location.href = `/checkout-pagamento.html${reason}`;
  };

  const scrollToTop = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goNext = async () => {
    if (!validateStep(currentStep)) return;
    setStatusMessage("");

    const isLast = currentStep === TOTAL_STEPS - 1;
    setSending(true);
    const result = await sendStepPayload(isLast);
    setSending(false);

    if (isLast) {
      if (!result) return;
      clearProgress();
      showCheckoutHandoff(result.cupom);
      return;
    }

    // Falha em etapa intermediária não bloqueia: o payload é cumulativo e o
    // próximo POST reenvia tudo (mesmo comportamento do formulário original).
    setStatusMessage("");
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    saveProgress(data, nextStep);
    scrollToTop();
  };

  const goPrev = () => {
    if (currentStep === 0) return;
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    saveProgress(data, prevStep);
    scrollToTop();
  };

  const fieldError = (name: string) =>
    errors[name] ? <p className="mt-1.5 text-sm font-semibold text-red-400">{errors[name]}</p> : null;

  const textField = (
    name: string,
    label: string,
    options: {
      placeholder?: string;
      type?: string;
      required?: boolean;
      autoComplete?: string;
      inputMode?: "tel" | "numeric" | "email";
      mask?: (value: string) => string;
      maxLength?: number;
    } = {}
  ) => (
    <div>
      <label htmlFor={`insc-${name}`} className="mb-1.5 block text-sm font-semibold text-gray-200">
        {label}
        {options.required ? <span className="text-turquoise"> *</span> : null}
      </label>
      <input
        id={`insc-${name}`}
        name={name}
        type={options.type || "text"}
        inputMode={options.inputMode}
        autoComplete={options.autoComplete}
        placeholder={options.placeholder}
        maxLength={options.maxLength}
        value={data[name] || ""}
        onChange={(event) =>
          setField(name, options.mask ? options.mask(event.target.value) : event.target.value)
        }
        className={inputClass}
      />
      {fieldError(name)}
    </div>
  );

  const radioGroup = (name: string, values: (string | { value: string; label: string })[], columns = 2) => (
    <div className={`grid gap-2 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
      {values.map((entry) => {
        const value = typeof entry === "string" ? entry : entry.value;
        const label = typeof entry === "string" ? entry : entry.label;
        return (
          <label
            key={value}
            className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm font-medium transition-colors ${
              data[name] === value
                ? "border-turquoise bg-turquoise/10 text-white"
                : "border-gray-700 bg-black/30 text-gray-300 hover:border-gray-500"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={value}
              checked={data[name] === value}
              onChange={() => setField(name, value)}
              className="h-4 w-4 accent-[#40E0D0]"
            />
            {label}
          </label>
        );
      })}
    </div>
  );

  return (
    <div
      ref={containerRef}
      id="inscricao"
      className="scroll-mt-6 rounded-3xl border border-turquoise/40 bg-gray-900/95 p-5 shadow-2xl shadow-turquoise/20 backdrop-blur-sm sm:p-7"
    >
      <div className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-turquoise">
        Inscrição oficial
      </div>
      <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
        Faça sua inscrição
      </h2>
      <p className="mt-1 text-sm text-gray-400">
        UP Day • 24 de Outubro e 07 de Novembro de 2026 • São Paulo-SP
      </p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs font-bold text-gray-400">
          <span>
            Etapa {currentStep + 1} de {TOTAL_STEPS} • {STEP_TITLES[currentStep]}
          </span>
          <span>{Math.round(((currentStep + 1) / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full rounded-full bg-turquoise transition-all duration-500"
            style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <form
        className="mt-5 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!sending) goNext();
        }}
      >
        {currentStep === 0 && (
          <>
            {textField("nome", "Nome completo", {
              placeholder: "Seu nome completo",
              required: true,
              autoComplete: "name",
            })}
            <div>
              <span className="mb-1.5 block text-sm font-semibold text-gray-200">
                Você usa nome social?
              </span>
              {radioGroup("usa_nome_social", ["Sim", "Não"])}
            </div>
            {data.usa_nome_social === "Sim" &&
              textField("nome_social", "Nome social", {
                placeholder: "Como você prefere ser chamado(a)",
                required: true,
                autoComplete: "nickname",
              })}
            <div className="grid gap-4 sm:grid-cols-2">
              {textField("rg", "RG", { placeholder: "Seu RG", required: true })}
              {textField("cpf", "CPF", {
                placeholder: "000.000.000-00",
                required: true,
                inputMode: "numeric",
                mask: maskCpf,
              })}
            </div>
          </>
        )}

        {currentStep === 1 && (
          <>
            {textField("endereco", "Endereço", {
              placeholder: "Rua, número, bairro e complemento",
              required: true,
              autoComplete: "street-address",
            })}
            <div className="grid gap-4 sm:grid-cols-2">
              {textField("cidade", "Cidade que reside", {
                placeholder: "Sua cidade",
                required: true,
                autoComplete: "address-level2",
              })}
              {textField("estado", "Estado (UF)", {
                placeholder: "SP",
                required: true,
                autoComplete: "address-level1",
                maxLength: 2,
              })}
            </div>
            {textField("email", "E-mail", {
              placeholder: "voce@email.com",
              type: "email",
              required: true,
              autoComplete: "email",
            })}
            <div className="grid gap-4 sm:grid-cols-2">
              {textField("telefone", "Telefone pessoal", {
                placeholder: "(00) 00000-0000",
                type: "tel",
                required: true,
                inputMode: "tel",
                autoComplete: "tel",
                mask: maskPhone,
              })}
              {textField("contato_emergencia", "Contato familiar/amigo", {
                placeholder: "(00) 00000-0000",
                type: "tel",
                required: true,
                inputMode: "tel",
                mask: maskPhone,
              })}
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {textField("data_nascimento", "Data de nascimento", {
                type: "date",
                required: true,
              })}
              {textField("profissao_area", "Profissão", {
                placeholder: "Sua profissão",
                required: true,
              })}
            </div>
            <div>
              <span className="mb-1.5 block text-sm font-semibold text-gray-200">
                Estado civil<span className="text-turquoise"> *</span>
              </span>
              {radioGroup("estado_civil", [
                "Solteiro(a)",
                "Casado(a)",
                "Viúvo(a)",
                "Separado(a)",
                "União Estável",
                "Outro",
              ])}
              {data.estado_civil === "Outro" && (
                <input
                  type="text"
                  placeholder="Se marcou outro, informe aqui"
                  value={data.estado_civil_outro || ""}
                  onChange={(event) => setField("estado_civil_outro", event.target.value)}
                  className={`${inputClass} mt-2`}
                />
              )}
              {fieldError("estado_civil")}
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <div>
              <label
                htmlFor="insc-medicamentos"
                className="mb-1.5 block text-sm font-semibold text-gray-200"
              >
                Usa algum medicamento ou faz tratamento? Se sim, qual?
              </label>
              <textarea
                id="insc-medicamentos"
                rows={2}
                placeholder="Informe ou escreva 'Não' se não houver."
                value={data.medicamentos_tratamento || ""}
                onChange={(event) => setField("medicamentos_tratamento", event.target.value)}
                className={inputClass}
              />
            </div>
            {textField("indicacao", "Quem te indicou o treinamento?", {
              placeholder: "Nome da pessoa, Instagram ou canal",
              required: true,
            })}
            <div>
              <span className="mb-1.5 block text-sm font-semibold text-gray-200">
                Tamanho da camiseta<span className="text-turquoise"> *</span>
              </span>
              {radioGroup("tamanho_camiseta", ["P", "M", "G", "GG", "XG", "XGG"])}
              {fieldError("tamanho_camiseta")}
            </div>
          </>
        )}

        {currentStep === 4 && (
          <div className="rounded-2xl border border-gray-700 bg-black/40 p-5 text-sm leading-relaxed text-gray-300">
            <h3 className="mb-2 text-lg font-bold text-white">Pagamento e confirmação</h3>
            <p>Na última etapa, você poderá informar um cupom de cortesia ou seguir para o pagamento normal.</p>
            <p className="mt-2">Com um cupom válido, sua inscrição é confirmada sem custo. Sem cupom, o link seguro de pagamento será exibido na sequência.</p>
            <p className="mt-3">
              <strong className="text-white">Obs.:</strong> Não é permitida a participação de
              gestantes. Outras condições especiais, consulte nossa equipe.
            </p>
          </div>
        )}

        {currentStep === 5 && (
          <>
            <div className="rounded-2xl border border-gray-700 bg-black/40 p-4 text-sm leading-relaxed text-gray-300">
              <h3 className="mb-1 font-bold text-white">Multa</h3>
              <p>
                Caso o contratante deseje adiar o treinamento, será cobrada uma taxa de R$ 400,00
                por qualquer imprevisto, ou haverá a possibilidade de substituir por alguém indicado
                por ele para ocupar essa vaga com 15 dias de antecedência da data do treinamento.
              </p>
              <label
                className={`mt-3 flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 font-semibold transition-colors ${
                  data.multa_ciente
                    ? "border-turquoise bg-turquoise/10 text-white"
                    : "border-gray-600 text-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={Boolean(data.multa_ciente)}
                  onChange={(event) =>
                    setField("multa_ciente", event.target.checked ? "Declaro estar ciente da taxa." : "")
                  }
                  className="mt-0.5 h-4 w-4 accent-[#40E0D0]"
                />
                Declaro estar ciente da taxa.
              </label>
              {fieldError("multa_ciente")}
            </div>
            <div className="rounded-2xl border border-gray-700 bg-black/40 p-4 text-sm leading-relaxed text-gray-300">
              <h3 className="mb-1 font-bold text-white">Cancelamento ou desistência</h3>
              <p>
                No caso de cancelamento ou não comparecimento, será reembolsado o valor integral no
                prazo de 7 dias a contar da contratação do treinamento. Após 7 dias poderá ceder sua
                vaga para outra pessoa indicada pelo contratante. Caso não haja o preenchimento da
                vaga não haverá devolução. Art. 49 CDC.
              </p>
              <label
                className={`mt-3 flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 font-semibold transition-colors ${
                  data.cancelamento_ciente
                    ? "border-turquoise bg-turquoise/10 text-white"
                    : "border-gray-600 text-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={Boolean(data.cancelamento_ciente)}
                  onChange={(event) =>
                    setField(
                      "cancelamento_ciente",
                      event.target.checked ? "Concordo com o termo acima." : ""
                    )
                  }
                  className="mt-0.5 h-4 w-4 accent-[#40E0D0]"
                />
                Concordo com o termo acima.
              </label>
              {fieldError("cancelamento_ciente")}
            </div>
          </>
        )}

        {currentStep === 6 && (
          <>
            <div>
              <span className="mb-1.5 block text-sm font-semibold text-gray-200">
                Você tem um cupom de desconto?<span className="text-turquoise"> *</span>
              </span>
              {radioGroup("tem_cupom", [
                { value: "Sim", label: "Sim, tenho um cupom" },
                { value: "Não", label: "Não tenho cupom" },
              ], 1)}
              {fieldError("tem_cupom")}
            </div>

            {data.tem_cupom === "Sim" && (
              <div className="rounded-2xl border border-gray-700 bg-black/40 p-4">
                <label htmlFor="insc-cupom" className="mb-1.5 block text-sm font-semibold text-gray-200">
                  Código do cupom
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    id="insc-cupom"
                    name="cupom"
                    type="text"
                    placeholder="DIGITE O CÓDIGO"
                    value={data.cupom || ""}
                    onChange={(event) => setField("cupom", event.target.value)}
                    className={inputClass}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={checkCoupon}
                    disabled={checkingCoupon}
                    className="h-auto border-turquoise px-5 py-3 text-turquoise hover:bg-turquoise hover:text-black"
                  >
                    {checkingCoupon ? "VERIFICANDO..." : "APLICAR"}
                  </Button>
                </div>
                {fieldError("cupom")}
                {couponFeedback && (
                  <p className={`mt-3 text-sm font-semibold ${couponFeedback.aplicado ? "text-emerald-400" : "text-red-400"}`}>
                    {couponMessage(couponFeedback)}
                  </p>
                )}
              </div>
            )}

            <p className="rounded-xl border border-gray-700 bg-black/30 p-3 text-sm text-gray-300">
              {data.tem_cupom === "Sim"
                ? "Ao finalizar, conferiremos o cupom novamente no servidor."
                : "Ao finalizar, você seguirá para a etapa de pagamento."}
            </p>
          </>
        )}

        {statusMessage && (
          <p className="text-sm font-semibold text-red-400" role="alert">
            {statusMessage}
          </p>
        )}

        <div className="flex gap-3 pt-1">
          {currentStep > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={goPrev}
              disabled={sending}
              className="h-auto border-gray-600 bg-transparent px-4 py-3.5 text-gray-200 hover:bg-gray-800 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </Button>
          )}
          <Button
            type="submit"
            variant="cta"
            disabled={sending}
            className="h-auto flex-1 whitespace-normal px-4 py-3.5 text-base leading-tight text-black"
          >
            {sending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : currentStep === TOTAL_STEPS - 1 ? (
              <>
                <CheckCircle2 className="h-5 w-5" />
                Finalizar inscrição
              </>
            ) : (
              "Continuar"
            )}
          </Button>
        </div>
        <p className="text-center text-xs text-gray-500">
          Leva poucos minutos • Seus dados ficam somente com nossa equipe
        </p>
      </form>
    </div>
  );
};

export default InscriptionForm;
