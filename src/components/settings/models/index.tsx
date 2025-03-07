import { usePreferenceContext } from "@/context"
import { OpenAISettings } from "./openai"
import { AnthropicSettings } from "./anthropic"
import { GeminiSettings } from "./gemini"
import { OllamaSettings } from "./ollama"
import { GrokSettings } from "./grok"
import { Flex } from "@/components/ui/flex"
// import { DeepSeekSettings } from "./deepseek"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ModelIcon, ModelIconType } from "@/components/model-icon"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export const ModelSettings = () => {
  const { apiKeys } = usePreferenceContext()
  const modelSettingsData = [
    {
      label: "OpenAI",
      value: "openai",
      iconType: "openai",
      connected: !!apiKeys.openai,
      settingsComponent: OpenAISettings,
    },
    {
      label: "Grok",
      value: "grok",
      iconType: "grok",
      connected: !!apiKeys.grok,
      settingsComponent: GrokSettings,
    },
    {
      label: "Anthropic",
      value: "anthropic",
      iconType: "anthropic",
      connected: !!apiKeys.anthropic,
      settingsComponent: AnthropicSettings,
    },
    {
      label: "Gemini",
      value: "gemini",
      iconType: "gemini",
      connected: !!apiKeys.gemini,
      settingsComponent: GeminiSettings,
    },
    {
      label: "Ollama",
      value: "ollama",
      iconType: "ollama",
      connected: !!apiKeys.ollama,
      settingsComponent: OllamaSettings,
    },
    // {
    //   label: "DeepSeek",
    //   value: "deepseek",
    //   iconType: "deepseek",
    //   connected: !!apiKeys.deepseek,
    //   settingsComponent: DeepSeekSettings,
    // },
  ]

  return (
    <Flex direction={"col"} gap={"lg"} className="p-2">
      <Accordion type="single" collapsible className="w-full">
        {modelSettingsData.map((model) => (
          <AccordionItem key={model.value} value={model.value}>
            <AccordionTrigger>
              <Flex gap={"sm"} items="center">
                <ModelIcon type={model.iconType as ModelIconType} size="sm" />
                {model.label}
              </Flex>
              <Flex className="flex-1" />
              <div
                className={cn(
                  "px-2 !rotate-0",
                  model.connected ? "text-emerald-600" : "text-zinc-500"
                )}
              >
                {model.connected ? (
                  <CheckCircle2 size={20} strokeWidth={1.5} />
                ) : (
                  <AlertCircle size={20} strokeWidth={1.5} />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <model.settingsComponent />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  )
}
