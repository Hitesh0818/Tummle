import { Button } from "./ui/button";
import { ArrowLeft, FileText, Scale, Users, AlertTriangle, Shield, CheckCircle, Languages } from "lucide-react";

interface TermsAndConditionsPageProps {
  language: "de" | "en";
  onBack: () => void;
  onLanguageChange: (language: "de" | "en") => void;
  onLegalClick?: (page: "imprint" | "privacy" | "terms" | "cookies") => void;
}

const translations = {
  de: {
    title: "Allgemeine Geschäftsbedingungen",
    subtitle: "Nutzungsbedingungen für die Tummle-Plattform",
    lastUpdated: "Letzte Aktualisierung: 1. Oktober 2024",
    
    acceptance: "Annahme der Bedingungen",
    acceptanceText: "Durch den Zugriff auf und die Nutzung unserer Website und unserer Dienste stimmen Sie zu, an diese Allgemeinen Geschäftsbedingungen gebunden zu sein. Wenn Sie mit einem Teil dieser Bedingungen nicht einverstanden sind, dürfen Sie unsere Dienste nicht nutzen.",
    
    serviceDescription: "Beschreibung des Dienstes",
    serviceDescriptionText: "Tummle ist eine Online-Plattform, die Arbeitssuchende mit potenziellen Arbeitgebern verbindet. Wir bieten Matching-Services für Teilzeit-, Nebenjobs und saisonale Beschäftigungsmöglichkeiten.",
    
    userAccounts: "Benutzerkonten",
    userAccountsText: "Um unsere Dienste zu nutzen, müssen Sie ein Konto erstellen. Sie sind verantwortlich für:",
    accountResponsibilities: [
      "Die Bereitstellung genauer und vollständiger Informationen",
      "Die Sicherheit Ihres Kontos und Passworts",
      "Alle Aktivitäten, die unter Ihrem Konto stattfinden",
      "Die unverzügliche Benachrichtigung bei unbefugtem Zugriff"
    ],
    
    acceptableUse: "Akzeptable Nutzung",
    acceptableUseText: "Sie verpflichten sich, unsere Plattform nur für rechtmäßige Zwecke zu nutzen. Es ist untersagt:",
    prohibitedActions: [
      "Falsche oder irreführende Informationen bereitzustellen",
      "Die Rechte anderer zu verletzen oder zu bedrohen",
      "Spam, Malware oder andere schädliche Inhalte zu verbreiten",
      "Die Plattform für illegale Aktivitäten zu nutzen",
      "Andere Benutzer zu belästigen oder zu diskriminieren",
      "Die Sicherheit der Plattform zu gefährden"
    ],
    
    jobMatching: "Job-Matching-Service",
    jobMatchingText: "Unser Service basiert auf einem Algorithmus, der Jobsuchende mit passenden Stellenangeboten verbindet. Wir garantieren nicht:",
    noGuarantees: [
      "Die Richtigkeit aller Stellenausschreibungen",
      "Die erfolgreiche Vermittlung einer Stelle",
      "Die Qualität der vermittelten Arbeitgeber",
      "Die Verfügbarkeit bestimmter Stellenangebote"
    ],
    
    payments: "Zahlungen und Gebühren",
    paymentsText: "Die Grundnutzung von Tummle ist für Jobsuchende kostenlos. Für Premium-Services können Gebühren anfallen, die im Voraus mitgeteilt werden. Alle Zahlungen sind nicht erstattungsfähig, es sei denn, dies ist gesetzlich vorgeschrieben.",
    
    intellectualProperty: "Geistiges Eigentum",
    intellectualPropertyText: "Alle Inhalte auf der Tummle-Plattform, einschließlich Texte, Grafiken, Logos und Software, sind Eigentum von Tummle oder seinen Lizenzgebern und durch Urheberrechtsgesetze geschützt.",
    
    privacy: "Datenschutz",
    privacyText: "Ihre Privatsphäre ist uns wichtig. Die Erfassung und Nutzung Ihrer Daten wird in unserer Datenschutzerklärung erläutert, die einen integralen Bestandteil dieser Bedingungen bildet.",
    
    termination: "Kündigung",
    terminationText: "Wir behalten uns das Recht vor, Ihr Konto zu kündigen oder zu sperren, wenn Sie gegen diese Bedingungen verstoßen. Sie können Ihr Konto jederzeit schließen, indem Sie uns kontaktieren.",
    
    limitation: "Haftungsbeschränkung",
    limitationText: "Tummle haftet nicht für indirekte, zufällige oder Folgeschäden, die aus der Nutzung unserer Dienste entstehen. Unsere Gesamthaftung ist auf den Betrag beschränkt, den Sie uns in den letzten 12 Monaten gezahlt haben.",
    
    governing: "Anwendbares Recht",
    governingText: "Diese Bedingungen unterliegen deutschem Recht. Für alle Streitigkeiten ist das zuständige Gericht in Berlin zuständig.",
    
    changes: "Änderungen der Bedingungen",
    changesText: "Wir können diese Bedingungen jederzeit ändern. Wesentliche Änderungen werden Ihnen per E-Mail oder durch eine Benachrichtigung auf unserer Plattform mitgeteilt.",
    
    contact: "Kontakt",
    contactText: "Bei Fragen zu diesen Bedingungen wenden Sie sich bitte an uns unter legal@tummle.de",
    
    backToHome: "Zurück zur Startseite"
  },
  en: {
    title: "Terms and Conditions",
    subtitle: "Terms of use for the Tummle platform",
    lastUpdated: "Last updated: October 1, 2024",
    
    acceptance: "Acceptance of Terms",
    acceptanceText: "By accessing and using our website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not use our services.",
    
    serviceDescription: "Service Description",
    serviceDescriptionText: "Tummle is an online platform that connects job seekers with potential employers. We provide matching services for part-time, side jobs, and seasonal employment opportunities.",
    
    userAccounts: "User Accounts",
    userAccountsText: "To use our services, you must create an account. You are responsible for:",
    accountResponsibilities: [
      "Providing accurate and complete information",
      "Maintaining the security of your account and password",
      "All activities that occur under your account",
      "Notifying us immediately of any unauthorized access"
    ],
    
    acceptableUse: "Acceptable Use",
    acceptableUseText: "You agree to use our platform only for lawful purposes. It is prohibited to:",
    prohibitedActions: [
      "Provide false or misleading information",
      "Violate or threaten the rights of others",
      "Distribute spam, malware, or other harmful content",
      "Use the platform for illegal activities",
      "Harass or discriminate against other users",
      "Compromise the security of the platform"
    ],
    
    jobMatching: "Job Matching Service",
    jobMatchingText: "Our service is based on an algorithm that connects job seekers with suitable job offers. We do not guarantee:",
    noGuarantees: [
      "The accuracy of all job postings",
      "Successful placement in a position",
      "The quality of matched employers",
      "The availability of specific job offers"
    ],
    
    payments: "Payments and Fees",
    paymentsText: "Basic use of Tummle is free for job seekers. Premium services may incur fees, which will be communicated in advance. All payments are non-refundable unless required by law.",
    
    intellectualProperty: "Intellectual Property",
    intellectualPropertyText: "All content on the Tummle platform, including text, graphics, logos, and software, is owned by Tummle or its licensors and protected by copyright laws.",
    
    privacy: "Privacy",
    privacyText: "Your privacy is important to us. The collection and use of your data is explained in our Privacy Policy, which forms an integral part of these terms.",
    
    termination: "Termination",
    terminationText: "We reserve the right to terminate or suspend your account if you violate these terms. You may close your account at any time by contacting us.",
    
    limitation: "Limitation of Liability",
    limitationText: "Tummle is not liable for indirect, incidental, or consequential damages arising from the use of our services. Our total liability is limited to the amount you have paid us in the last 12 months.",
    
    governing: "Governing Law",
    governingText: "These terms are governed by German law. The competent court in Berlin has jurisdiction for all disputes.",
    
    changes: "Changes to Terms",
    changesText: "We may modify these terms at any time. Material changes will be communicated to you via email or through a notification on our platform.",
    
    contact: "Contact",
    contactText: "If you have any questions about these terms, please contact us at legal@tummle.de",
    
    backToHome: "Back to Homepage"
  }
};

export function TermsAndConditionsPage({ language, onBack, onLanguageChange, onLegalClick }: TermsAndConditionsPageProps) {
  const t = translations[language];

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-white via-primary/5 to-secondary/10 safe-area-bottom">
      {/* Header */}
      <header className="w-full sticky top-0 bg-white/95 backdrop-blur-xl border-b border-primary/10 z-50 shadow-lg safe-area-top">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between max-w-4xl">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2 hover:bg-primary/5 transition-colors duration-300 min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">{t.backToHome}</span>
          </Button>
          
          {/* Language Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLanguageChange(language === "de" ? "en" : "de")}
            className="relative overflow-hidden group flex items-center gap-2 border-primary/20 hover:bg-primary/5 min-h-[44px] px-3 hover:border-primary/40 transition-all duration-500 hover:shadow-xl rounded-xl touch-manipulation"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Languages className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-sm uppercase font-medium relative z-10">
              {language === "de" ? "EN" : "DE"}
            </span>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 lg:p-12">
          {/* Title */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-primary/70 mb-2">{t.subtitle}</p>
            <p className="text-sm text-primary/50">{t.lastUpdated}</p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {/* Acceptance */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-accent" />
                {t.acceptance}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 leading-relaxed">
                {t.acceptanceText}
              </p>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-secondary" />
                {t.serviceDescription}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl p-6 leading-relaxed">
                {t.serviceDescriptionText}
              </p>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-accent" />
                {t.userAccounts}
              </h2>
              <p className="text-primary/70 mb-4 leading-relaxed">{t.userAccountsText}</p>
              <ul className="space-y-3">
                {t.accountResponsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3 text-primary/70 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-4">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-secondary" />
                {t.acceptableUse}
              </h2>
              <p className="text-primary/70 mb-4 leading-relaxed">{t.acceptableUseText}</p>
              <ul className="space-y-3">
                {t.prohibitedActions.map((action, index) => (
                  <li key={index} className="flex items-start gap-3 text-primary/70 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-lg p-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{action}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Job Matching */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-primary" />
                {t.jobMatching}
              </h2>
              <p className="text-primary/70 mb-4 leading-relaxed">{t.jobMatchingText}</p>
              <ul className="space-y-3">
                {t.noGuarantees.map((guarantee, index) => (
                  <li key={index} className="flex items-start gap-3 text-primary/70 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{guarantee}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Payments */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-accent" />
                {t.payments}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl p-6 leading-relaxed">
                {t.paymentsText}
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-secondary" />
                {t.intellectualProperty}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-6 leading-relaxed">
                {t.intellectualPropertyText}
              </p>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-accent" />
                {t.privacy}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 leading-relaxed">
                {t.privacyText}
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-secondary" />
                {t.termination}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl p-6 leading-relaxed">
                {t.terminationText}
              </p>
            </section>

            {/* Limitation */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-primary" />
                {t.limitation}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-6 leading-relaxed">
                {t.limitationText}
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-secondary" />
                {t.governing}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 leading-relaxed">
                {t.governingText}
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-accent" />
                {t.changes}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl p-6 leading-relaxed">
                {t.changesText}
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                {t.contact}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-6 leading-relaxed">
                {t.contactText}
              </p>
            </section>
          </div>

          {/* Back Button */}
          <div className="text-center mt-8 sm:mt-12">
            <Button
              onClick={onBack}
              className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-8 py-3 rounded-2xl transition-all duration-500 shadow-xl hover:shadow-accent/30 transform hover:scale-105 flex items-center gap-2 mx-auto min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-5 h-5" />
              {t.backToHome}
            </Button>
          </div>

          {/* Legal Navigation */}
          {onLegalClick && (
            <div className="mt-8 sm:mt-12 pt-8 border-t border-primary/10">
              <h3 className="text-lg font-bold text-primary mb-4 text-center">
                {language === 'de' ? 'Weitere rechtliche Informationen' : 'Additional Legal Information'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => onLegalClick("imprint")}
                  className="h-12 text-sm border-primary/20 hover:bg-primary/5 touch-manipulation"
                >
                  {language === 'de' ? 'Impressum' : 'Imprint'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onLegalClick("privacy")}
                  className="h-12 text-sm border-primary/20 hover:bg-primary/5 touch-manipulation"
                >
                  {language === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onLegalClick("cookies")}
                  className="h-12 text-sm border-primary/20 hover:bg-primary/5 touch-manipulation"
                >
                  {language === 'de' ? 'Cookie-Richtlinie' : 'Cookie Policy'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}