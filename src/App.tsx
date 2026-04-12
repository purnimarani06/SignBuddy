import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import TextToSign from "@/pages/TextToSign";
import SignToText from "@/pages/SignToText";
import VoiceToText from "@/pages/VoiceToText";
import TextToVoice from "@/pages/TextToVoice";
import Learn from "@/pages/Learn";
import Dictionary from "@/pages/Dictionary";
import SOS from "@/pages/SOS";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/text-to-sign" element={<TextToSign />} />
            <Route path="/sign-to-text" element={<SignToText />} />
            <Route path="/voice-to-text" element={<VoiceToText />} />
            <Route path="/text-to-voice" element={<TextToVoice />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/sos" element={<SOS />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
