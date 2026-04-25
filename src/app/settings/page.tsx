"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Moon, Sun, RefreshCw, Database, Wifi } from "lucide-react";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [pollingInterval, setPollingInterval] = useState<number>(3000);
  const [useMock, setUseMock] = useState<boolean>(true);
  const [apiUrl, setApiUrl] = useState<string>("http://localhost:18790");

  useEffect(() => {
    // Load from localStorage
    const savedTheme = localStorage.getItem("clawhouse-theme") as "light" | "dark" | null;
    const savedInterval = localStorage.getItem("clawhouse-polling");
    const savedMock = localStorage.getItem("clawhouse-mock");
    const savedApi = localStorage.getItem("clawhouse-api");

    if (savedTheme) setTheme(savedTheme);
    if (savedInterval) setPollingInterval(Number(savedInterval));
    if (savedMock !== null) setUseMock(savedMock === "true");
    if (savedApi) setApiUrl(savedApi);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("clawhouse-theme", theme);
    localStorage.setItem("clawhouse-polling", String(pollingInterval));
    localStorage.setItem("clawhouse-mock", String(useMock));
    localStorage.setItem("clawhouse-api", apiUrl);
    alert("Configurações salvas! Recarregue a página para aplicar.");
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">⚙️ Configurações</h1>
        <p className="text-sm text-neutral-500">
          Personalize o comportamento do ClawHouse
        </p>
      </div>

      <div className="space-y-6">
        {/* Tema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              Tema
            </CardTitle>
            <CardDescription>Escolha entre claro ou escuro</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                onClick={() => setTheme("light")}
                className="flex-1"
              >
                <Sun className="w-4 h-4 mr-2" />
                Claro
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                onClick={() => setTheme("dark")}
                className="flex-1"
              >
                <Moon className="w-4 h-4 mr-2" />
                Escuro
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Polling */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Intervalo de Polling
            </CardTitle>
            <CardDescription>Com que frequência verificar novas atividades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {[1000, 2000, 3000, 5000, 10000].map((ms) => (
                <Button
                  key={ms}
                  variant={pollingInterval === ms ? "default" : "outline"}
                  onClick={() => setPollingInterval(ms)}
                  size="sm"
                >
                  {ms / 1000}s
                </Button>
              ))}
            </div>
            <div className="text-xs text-neutral-400 mt-2 flex items-center gap-1">
              Atual: <Badge variant="secondary">{pollingInterval / 1000}s</Badge>
            </div>
          </CardContent>
        </Card>

        {/* API / Mock */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Fonte de Dados
            </CardTitle>
            <CardDescription>Escolha entre dados mockados ou API real</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={useMock ? "default" : "outline"}
                onClick={() => setUseMock(true)}
                className="flex-1"
              >
                <Database className="w-4 h-4 mr-2" />
                Mock Data
              </Button>
              <Button
                variant={!useMock ? "default" : "outline"}
                onClick={() => setUseMock(false)}
                className="flex-1"
              >
                <Wifi className="w-4 h-4 mr-2" />
                API Real
              </Button>
            </div>

            {!useMock && (
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1">
                  URL da API
                </label>
                <input
                  type="url"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  placeholder="http://localhost:18790"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info */}
        <Card>
          <CardHeader>
            <CardTitle>ℹ️ Sobre</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-600">
            <p>
              <strong>ClawHouse</strong> — Fase 0 (MVP)
            </p>
            <p>O lar virtual do agente Claw.</p>
            <div className="pt-2 border-t border-neutral-100">
              <p className="text-xs text-neutral-400">
                Variáveis de ambiente atuais:
              </p>
              <code className="text-xs bg-neutral-100 px-2 py-1 rounded block mt-1">
                NEXT_PUBLIC_CLAWHOUSE_API={process.env.NEXT_PUBLIC_CLAWHOUSE_API || "não definido"}
              </code>
              <code className="text-xs bg-neutral-100 px-2 py-1 rounded block mt-1">
                NEXT_PUBLIC_USE_MOCK={process.env.NEXT_PUBLIC_USE_MOCK || "não definido"}
              </code>
            </div>
          </CardContent>
        </Card>

        <Button onClick={saveSettings} className="w-full">
          💾 Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
