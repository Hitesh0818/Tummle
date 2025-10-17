import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ArrowLeft, Calendar, MapPin, Clock, GraduationCap, User, CheckCircle, X, Plus, Languages, Shield, Menu, ArrowRight, Facebook, Linkedin, Instagram, Sun, Moon, Sunrise } from "lucide-react";
import logoImage from '@/assets/4cfd463b1380bb2fa69d95e0b6157e3dc2be26a2.png'; // 🚨 FIX
import { Footer } from './Footer';
import { GooglePlacesAutocomplete } from './GooglePlacesAutocomplete';

interface JobSeekerFormProps {
  language: 'de' | 'en';
  onHome: () => void;
  onSwitchToEmployer: () => void;
  onLanguageChange?: (language: 'de' | 'en') => void;
  onLegalClick?: (page: "imprint" | "privacy" | "terms" | "cookies") => void;
}

interface LocationWithRadius {
  placeId: string;
  formattedAddress: string;
  name: string;
  types: string[];
  lat: number;
  lng: number;
  radius?: number;
  radiusUnit: string;
  level: 'country' | 'state' | 'city' | 'district' | 'street';
  radiusRequired: boolean;
  radiusAllowed: boolean;
}

const translations = {
  de: {
    // Header
    backToHome: "Zurück zur Startseite",
    employerButton: "Arbeitgeber",
    registrationForm: "Jobseeker Registrierung",
    
    // Sections
    preferences: "Präferenzen",
    geoAvailability: "Geografische Verfügbarkeit",
    timeAvailability: "Zeit-Verfügbarkeit",
    educationSkills: "Bildung & Fähigkeiten",
    personalInfo: "Persönliche Informationen",
    actions: "Aktionen",
    
    // Fields
    jobRoles: "Rolle",
    experience: "Erfahrung",
    salaryExpectation: "Gehaltserwartung",
    location: "Ort",
    locationRadius: "Radius",
    dateFrom: "Ab Datum",
    dateUntil: "Bis Datum",
    daysShifts: "Tage & Schichten",
    hoursPerWeek: "Stunden pro Woche",
    educationLevel: "Bildungsstand",
    languages: "Sprachen",
    languageLevel: "Sprachniveau",
    drivingLicenses: "Führerscheine",
    professionalCertifications: "Zertifikate & Lizenzen",
    facebookLink: "Facebook",
    linkedinLink: "LinkedIn", 
    instagramLink: "Instagram",
    firstName: "Vorname",
    lastName: "Nachname",
    email: "Email",
    phone: "Telefon",
    mobile: "Mobil",
    
    // Options
    noExperience: "Keine Erfahrung",
    basic: "Grundkenntnisse",
    advanced: "Fortgeschritten",
    professional: "Professionell",
    
    basicEducation: "Grundschule",
    secondaryEducation: "Realschule",
    highSchool: "Gymnasium",
    vocationalTraining: "Berufsausbildung",
    bachelors: "Bachelor",
    masters: "Master",
    doctorate: "Promotion",
    
    german: "Deutsch",
    english: "Englisch",
    french: "Französisch",
    spanish: "Spanisch",
    italian: "Italienisch",
    portuguese: "Portugiesisch",
    russian: "Russisch",
    turkish: "Türkisch",
    arabic: "Arabisch",
    chinese: "Chinesisch",
    
    beginner: "Grundkenntnisse",
    conversational: "Konversationsniveau",
    advancedLevel: "Fortgeschritten",
    fluent: "Fließend/Muttersprache",
    
    carLicense: "PKW (Klasse B)",
    motorcycleLicense: "Motorrad (Klasse A)",
    truckLicense: "LKW (Klasse C)",
    busLicense: "Bus (Klasse D)",
    
    // Professional Certifications
    firstAid: "Erste Hilfe",
    foodSafety: "Lebensmittelhygiene",
    safety: "Arbeitsschutz",
    forklift: "Gabelstaplerführerschein",
    crane: "Kranführerschein",
    bartending: "Barkeeper-Zertifikat",
    sommelier: "Sommelier",
    lifeguard: "Rettungsschwimmer",
    tour_guide: "Reiseführer",
    
    // Job roles
    waiter: "Kellner/in",
    cook: "Koch/Köchin",
    cleaner: "Reinigungskraft",
    driver: "Fahrer/in",
    salesAssistant: "Verkäufer/in",
    receptionist: "Rezeptionist/in",
    // NOTE: The 'security' job role translation that caused the duplicate key error is removed here.
    warehouse: "Lagerarbeiter/in",
    bartender: "Barkeeper/in",
    housekeeper: "Hauskeeper/in",
    deliveryDriver: "Lieferfahrer/in",
    kitchenHelper: "Küchenhelfer/in",
    
    // Days
    monday: "Montag",
    tuesday: "Dienstag",
    wednesday: "Mittwoch",
    thursday: "Donnerstag",
    friday: "Freitag",
    saturday: "Samstag",
    sunday: "Sonntag",
    
    // Shifts
    morningShift: "Früh",
    afternoonShift: "Spät",
    nightShift: "Nacht",
    businessHours: "Geschäftszeiten",
    allTime: "Rund um die Uhr",
    
    // Week schedule
    weekSchedule: "Wochentermine",
    selectAllDays: "Alle Tage",
    selectBusinessHours: "Geschäftszeiten",
    morning: "Morgen",
    afternoon: "Nachmittag",
    night: "Nacht",
    
    // Privacy Policy Section
    privacyPolicySection: "Datenschutz & Einverständnis",
    
    // Agreements
    dataConsent: "Ich stimme zu, dass meine Informationen an ausgewählte Arbeitgeber weitergegeben werden, deren Bedarfe meinen Präferenzen und Verfügbarkeiten entsprechen",
    termsConsent: "Ich habe die AGB und Datenschutzbestimmungen gelesen und stimme diesen zu.",
    
    // Buttons
    submit: "Absenden",
    submitting: "Wird gesendet...",
    add: "Hinzufügen",
    typeToSearch: "Tippen zum Suchen...",
    selectRole: "Rolle auswählen...",
    selectLocation: "Ort auswählen...",
    selectLanguage: "Sprache auswählen...",
    selectLicense: "Führerschein auswählen...",
    
    // Units
    km: "km",
    
    // Validation
    required: "Dieses Feld ist erforderlich",
    selectAtLeastOne: "Bitte mindestens eine Option auswählen",
    invalidEmail: "Bitte gültige E-Mail-Adresse eingeben",
    
    // Success
    successTitle: "Anmeldung erfolgreich!",
    successMessage: "Vielen Dank für Ihre Registrierung. Wir haben Ihre Informationen erhalten und werden uns bald bei Ihnen melden.",
    backToWebsite: "Zurück zur Startseite",
    
    // Short day names for mobile
    mondayShort: "Mo",
    tuesdayShort: "Di", 
    wednesdayShort: "Mi",
    thursdayShort: "Do",
    fridayShort: "Fr",
    saturdayShort: "Sa",
    sundayShort: "So"
  },
  en: {
    // Header
    backToHome: "Back to Home",
    employerButton: "Employer",
    registrationForm: "Job Seeker Registration",
    
    // Sections
    preferences: "Preferences",
    geoAvailability: "Geographic Availability",
    timeAvailability: "Time Availability",
    educationSkills: "Education & Skills",
    personalInfo: "Personal Information",
    actions: "Actions",
    
    // Fields
    jobRoles: "Job Role(s)",
    experience: "Experience",
    salaryExpectation: "Salary Expectation",
    location: "Location",
    locationRadius: "Radius",
    dateFrom: "From Date",
    dateUntil: "Until Date",
    daysShifts: "Days & Shifts",
    hoursPerWeek: "Hours per Week",
    educationLevel: "Education Level",
    languages: "Languages",
    languageLevel: "Language Level",
    drivingLicenses: "Driving Licenses", 
    professionalCertifications: "Professional Licenses & Certifications",
    facebookLink: "Facebook",
    linkedinLink: "LinkedIn",
    instagramLink: "Instagram", 
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    mobile: "Mobile",
    
    // Options
    noExperience: "No Experience",
    basic: "Basic",
    advanced: "Advanced",
    professional: "Professional",
    
    basicEducation: "Basic Education",
    secondaryEducation: "Secondary Education",
    highSchool: "High School",
    vocationalTraining: "Vocational Training",
    bachelors: "Bachelor's Degree",
    masters: "Master's Degree",
    doctorate: "Doctorate",
    
    german: "German",
    english: "English",
    french: "French",
    spanish: "Spanish",
    italian: "Italian",
    portuguese: "Portuguese",
    russian: "Russian",
    turkish: "Turkish",
    arabic: "Arabic",
    chinese: "Chinese",
    
    beginner: "Beginner",
    conversational: "Conversational",
    advancedLevel: "Advanced",
    fluent: "Fluent/Native",
    
    carLicense: "Car (Class B)",
    motorcycleLicense: "Motorcycle (Class A)",
    truckLicense: "Truck (Class C)",
    busLicense: "Bus (Class D)",
    
    // Professional Certifications
    firstAid: "First Aid",
    foodSafety: "Food Safety",
    safety: "Occupational Safety",
    forklift: "Forklift License",
    crane: "Crane License",
    bartending: "Bartending Certificate",
    sommelier: "Sommelier",
    lifeguard: "Lifeguard",
    tour_guide: "Tour Guide",
    
    // Job roles
    waiter: "Waiter/Waitress",
    cook: "Cook",
    cleaner: "Cleaner",
    driver: "Driver",
    salesAssistant: "Sales Assistant",
    receptionist: "Receptionist",
    // REMOVED: security: "Security Guard", // This was the conflicting job role translation.
    warehouse: "Warehouse Worker",
    bartender: "Bartender",
    housekeeper: "Housekeeper",
    deliveryDriver: "Delivery Driver",
    kitchenHelper: "Kitchen Helper",
    
    // Days
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    
    // Shifts
    morningShift: "Morning",
    afternoonShift: "Afternoon",
    nightShift: "Night",
    businessHours: "Business Hours",
    allTime: "24/7",
    
    // Week schedule
    weekSchedule: "Week Schedule",
    selectAllDays: "All Days",
    selectBusinessHours: "Business Hours",
    morning: "Morning",
    afternoon: "Afternoon",
    night: "Night",
    
    // Privacy Policy Section
    privacyPolicySection: "Privacy & Consent",
    
    // Agreements
    dataConsent: "I agree that my information may be shared with selected employers whose needs match my preferences and availability",
    termsConsent: "I have read and agree to the Terms & Conditions and Privacy Policy.",
    
    // Buttons
    submit: "Submit",
    submitting: "Submitting...",
    add: "Add",
    typeToSearch: "Type to search...",
    selectRole: "Select role...",
    selectLocation: "Select location...",
    selectLanguage: "Select language...",
    selectLicense: "Select license...",
    
    // Units
    km: "km",
    
    // Validation
    required: "This field is required",
    selectAtLeastOne: "Please select at least one option",
    invalidEmail: "Please enter a valid email address",
    
    // Success
    successTitle: "Registration Successful!",
    successMessage: "Thank you for your registration. We have received your information and will contact you soon.",
    backToWebsite: "Back to Homepage",
    
    // Short day names for mobile
    mondayShort: "Mon",
    tuesdayShort: "Tue", 
    wednesdayShort: "Wed",
    thursdayShort: "Thu",
    fridayShort: "Fri",
    saturdayShort: "Sat",
    sundayShort: "Sun"
  }
};

interface LanguageWithLevel {
  language: string;
  level: string;
}

interface RoleWithExperience {
  role: string;
  experience: string;
}

interface SocialMediaLink {
  platform: string;
  url: string;
}

interface FormData {
  jobRoles: RoleWithExperience[];
  locations: LocationWithRadius[];
  dateFrom: string;
  dateUntil: string;
  weekSchedule: string[];
  hoursPerWeekMin: number;
  hoursPerWeekMax: number;
  educationLevel: string;
  languages: LanguageWithLevel[];
  drivingLicenses: string[];
  professionalCertifications: string[];
  socialMediaLinks: SocialMediaLink[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  dataConsent: boolean;
  termsConsent: boolean;
}

// Multi-select dropdown component
function MultiSelectDropdown({ 
  options, 
  selectedItems, 
  onItemSelect, 
  onItemRemove, 
  placeholder, 
  searchValue, 
  setSearchValue,
  renderBadge,
  hideBadges = false
}: {
  options: Array<{value: string, label: string}>;
  selectedItems: any[];
  onItemSelect: (item: any) => void;
  onItemRemove: (item: any) => void;
  placeholder: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  renderBadge: (item: any, onRemove: () => void) => React.ReactNode;
  hideBadges?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchValue.toLowerCase()) &&
    !selectedItems.some(item => 
      (typeof item === 'string' && item === option.value) ||
      (typeof item === 'object' && (item.role === option.value || item.language === option.value || item.platform === option.value))
    )
  );

  return (
    <div className="relative">
      {/* Selected items */}
      {!hideBadges && selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedItems.map((item, index) => {
            // Generate a unique key based on the item content
            const itemKey = typeof item === 'string' 
              ? item 
              : item.role || item.language || item.platform || item.location || `item-${index}`;
            
            return (
              <div key={itemKey}>
                {renderBadge(item, () => onItemRemove(item))}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Search input */}
      <div className="relative">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors"
                onClick={() => {
                  onItemSelect(option);
                  setSearchValue('');
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500 text-sm">
              No options found
            </div>
          )}
        </div>
      )}
      
      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export function JobSeekerForm({ language, onHome, onSwitchToEmployer, onLanguageChange, onLegalClick }: JobSeekerFormProps) {
  const t = translations[language];
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Search states for dropdowns
  const [roleSearchValue, setRoleSearchValue] = useState('');
  const [languageSearchValue, setLanguageSearchValue] = useState('');
  const [licenseSearchValue, setLicenseSearchValue] = useState('');
  const [certificationSearchValue, setCertificationSearchValue] = useState('');
  const [socialMediaSearchValue, setSocialMediaSearchValue] = useState('');

  const [formData, setFormData] = useState<FormData>({
    jobRoles: [],
    locations: [],
    dateFrom: new Date().toISOString().split('T')[0],
    dateUntil: '',
    weekSchedule: [],
    hoursPerWeekMin: 0,
    hoursPerWeekMax: 40,
    educationLevel: '',
    languages: [],
    drivingLicenses: [],
    professionalCertifications: [],
    socialMediaLinks: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    dataConsent: false,
    termsConsent: false
  });

  // Add state to track schedule mode
  const [scheduleMode, setScheduleMode] = useState<'none' | 'allDay' | 'businessHours'>('none');

  const jobRoleOptions = [
    { value: 'waiter', label: t.waiter },
    { value: 'cook', label: t.cook },
    { value: 'cleaner', label: t.cleaner },
    { value: 'driver', label: t.driver },
    { value: 'salesAssistant', label: t.salesAssistant },
    { value: 'receptionist', label: t.receptionist },
    // The conflicting job role option is permanently removed from here.
    { value: 'warehouse', label: t.warehouse },
    { value: 'bartender', label: t.bartender },
    { value: 'housekeeper', label: t.housekeeper },
    { value: 'deliveryDriver', label: t.deliveryDriver },
    { value: 'kitchenHelper', label: t.kitchenHelper }
  ];

  const experienceOptions = [
    { value: 'none', label: t.noExperience },
    { value: 'basic', label: t.basic },
    { value: 'advanced', label: t.advanced },
    { value: 'professional', label: t.professional }
  ];


  const educationOptions = [
    { value: 'basic', label: t.basicEducation },
    { value: 'secondary', label: t.secondaryEducation },
    { value: 'highSchool', label: t.highSchool },
    { value: 'vocational', label: t.vocationalTraining },
    { value: 'bachelors', label: t.bachelors },
    { value: 'masters', label: t.masters },
    { value: 'doctorate', label: t.doctorate }
  ];

  const languageOptions = [
    { value: 'german', label: t.german },
    { value: 'english', label: t.english },
    { value: 'french', label: t.french },
    { value: 'spanish', label: t.spanish },
    { value: 'italian', label: t.italian },
    { value: 'portuguese', label: t.portuguese },
    { value: 'russian', label: t.russian },
    { value: 'turkish', label: t.turkish },
    { value: 'arabic', label: t.arabic },
    { value: 'chinese', label: t.chinese }
  ];

  const languageLevelOptions = [
    { value: 'beginner', label: t.beginner },
    { value: 'conversational', label: t.conversational },
    { value: 'advanced', label: t.advancedLevel },
    { value: 'fluent', label: t.fluent }
  ];

  const drivingLicenseOptions = [
    { value: 'car', label: t.carLicense },
    { value: 'motorcycle', label: t.motorcycleLicense },
    { value: 'truck', label: t.truckLicense },
    { value: 'bus', label: t.busLicense }
  ];

  const professionalCertificationOptions = [
    { value: 'firstAid', label: t.firstAid },
    { value: 'foodSafety', label: t.foodSafety },
    { value: 'safety', label: t.safety },
    { value: 'forklift', label: t.forklift },
    { value: 'crane', label: t.crane },
    { value: 'bartending', label: t.bartending },
    { value: 'sommelier', label: t.sommelier },
    { value: 'lifeguard', label: t.lifeguard },
    { value: 'tour_guide', label: t.tour_guide }
  ];

  const socialMediaPlatformOptions = [
    { value: 'facebook', label: t.facebookLink },
    { value: 'linkedin', label: t.linkedinLink },
    { value: 'instagram', label: t.instagramLink }
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const shifts = ['morning', 'afternoon', 'night'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.jobRoles.length === 0) {
      newErrors.jobRoles = t.selectAtLeastOne;
    }

    if (formData.locations.length === 0) {
      newErrors.locations = t.selectAtLeastOne;
    }

    // Validate that locations with required radius have radius set
    const locationsWithMissingRadius = formData.locations.filter(loc => 
      loc.radiusRequired && (!loc.radius || loc.radius <= 0)
    );
    if (locationsWithMissingRadius.length > 0) {
      newErrors.locations = language === 'de' 
        ? 'Bitte Radius für alle Straßenadressen angeben'
        : 'Please specify radius for all street addresses';
    }

    if (!formData.dateFrom) {
      newErrors.dateFrom = t.required;
    }

    if (formData.weekSchedule.length === 0) {
      newErrors.weekSchedule = t.selectAtLeastOne;
    }

    if (!formData.educationLevel) {
      newErrors.educationLevel = t.required;
    }

    if (formData.languages.length === 0) {
      newErrors.languages = t.selectAtLeastOne;
    }

    if (!formData.firstName) {
      newErrors.firstName = t.required;
    }

    if (!formData.lastName) {
      newErrors.lastName = t.required;
    }

    if (!formData.email) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!formData.dataConsent) {
      newErrors.dataConsent = t.required;
    }

    if (!formData.termsConsent) {
      newErrors.termsConsent = t.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 🚨 Actual Backend API Call for Job Seeker Registration
      const response = await fetch('https://tummle-1jwaisxfz-hiteshs-projects-52ac4287.vercel.app', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Attempt to parse server error message
        const errorData = await response.json();
        
        // Handle 409 Conflict (Duplicate Email)
        if (response.status === 409 && errorData.error.includes('Email already registered')) {
          setErrors(prev => ({ ...prev, email: errorData.error }));
        } 
        // Handle 400 Bad Request (Validation Errors)
        else if (response.status === 400 && errorData.details) {
            // Mongoose validation errors often return a complex object.
            // Simplified error display for the user.
            alert(language === 'de' 
                ? 'Bitte überprüfen Sie die Formularfelder auf fehlende oder ungültige Eingaben.'
                : 'Please check the form for missing or invalid inputs.'
            );
        } else {
            throw new Error(errorData.error || 'Job Seeker registration failed');
        }
        
        // Return early on error so we don't proceed to success state
        return; 
      }

      // Success
      setSubmitted(true);
      // Scroll to top to show success message clearly
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Job Seeker Submission Error:', error);
      alert(language === 'de' 
        ? 'Ein Netzwerkfehler ist aufgetreten. Bitte versuchen Sie es später erneut.' 
        : 'A network error occurred. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleSelect = (option: {value: string, label: string}) => {
    const newRole: RoleWithExperience = {
      role: option.value,
      experience: ''
    };
    setFormData(prev => ({
      ...prev,
      jobRoles: [...prev.jobRoles, newRole]
    }));
  };


  const handleRoleRemove = (roleToRemove: RoleWithExperience) => {
    setFormData(prev => ({
      ...prev,
      jobRoles: prev.jobRoles.filter(role => role.role !== roleToRemove.role)
    }));
  };

  const handleLocationAdd = (location: LocationWithRadius) => {
    setFormData(prev => ({
      ...prev,
      locations: [...prev.locations, location]
    }));
  };

  const handleLocationRemove = (locationToRemove: LocationWithRadius) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.filter(loc => loc.placeId !== locationToRemove.placeId)
    }));
  };

  const handleLanguageSelect = (option: {value: string, label: string}) => {
    const newLanguage: LanguageWithLevel = {
      language: option.value,
      level: ''
    };
    setFormData(prev => ({
      ...prev,
      languages: [...prev.languages, newLanguage]
    }));
  };

  const handleLanguageRemove = (languageToRemove: LanguageWithLevel) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.language !== languageToRemove.language)
    }));
  };

  const handleLicenseSelect = (option: {value: string, label: string}) => {
    setFormData(prev => ({
      ...prev,
      drivingLicenses: [...prev.drivingLicenses, option.value]
    }));
  };

  const handleLicenseRemove = (licenseToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      drivingLicenses: prev.drivingLicenses.filter(license => license !== licenseToRemove)
    }));
  };

  const handleCertificationSelect = (option: {value: string, label: string}) => {
    setFormData(prev => ({
      ...prev,
      professionalCertifications: [...prev.professionalCertifications, option.value]
    }));
  };

  const handleCertificationRemove = (certificationToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      professionalCertifications: prev.professionalCertifications.filter(cert => cert !== certificationToRemove)
    }));
  };

  const handleSocialMediaSelect = (option: {value: string, label: string}) => {
    const newSocialMedia: SocialMediaLink = {
      platform: option.value,
      url: ''
    };
    setFormData(prev => ({
      ...prev,
      socialMediaLinks: [...prev.socialMediaLinks, newSocialMedia]
    }));
  };

  const handleSocialMediaRemove = (socialMediaToRemove: SocialMediaLink) => {
    setFormData(prev => ({
      ...prev,
      socialMediaLinks: prev.socialMediaLinks.filter(link => link.platform !== socialMediaToRemove.platform)
    }));
  };

  const toggleWeekScheduleItem = (item: string) => {
    // Allow individual changes even when in business hours mode
    setFormData(prev => ({
      ...prev,
      weekSchedule: prev.weekSchedule.includes(item)
        ? prev.weekSchedule.filter(i => i !== item)
        : [...prev.weekSchedule, item]
    }));
    
    // Reset mode when making individual changes
    if (scheduleMode !== 'none') {
      setScheduleMode('none');
    }
  };

  const selectAllDays = () => {
    const allDayShifts = days.flatMap(day => 
      shifts.map(shift => `${day}-${shift}`)
    );
    
    if (scheduleMode === 'allDay') {
      // If already in all day mode, clear everything
      setFormData(prev => ({
        ...prev,
        weekSchedule: []
      }));
      setScheduleMode('none');
    } else {
      // Select all day shifts and set mode
      setFormData(prev => ({
        ...prev,
        weekSchedule: allDayShifts
      }));
      setScheduleMode('allDay');
    }
  };

  const selectBusinessHours = () => {
    const businessHours = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
      .flatMap(day => [`${day}-morning`, `${day}-afternoon`]);
    
    if (scheduleMode === 'businessHours') {
      // If already in business hours mode, clear everything
      setFormData(prev => ({
        ...prev,
        weekSchedule: []
      }));
      setScheduleMode('none');
    } else {
      // Select business hours and set mode
      setFormData(prev => ({
        ...prev,
        weekSchedule: businessHours
      }));
      setScheduleMode('businessHours');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <header className="w-full bg-white border-b border-primary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl">
            <img 
              src={logoImage} 
              alt="TUMMLE Logo" 
              className="h-8 w-auto object-contain cursor-pointer"
              onClick={onHome}
            />
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-2xl">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-medium text-primary">{t.successTitle}</h1>
              <p className="text-lg text-primary/80 leading-relaxed">
                {t.successMessage}
              </p>
            </div>

            <Button 
              onClick={onHome}
              className="bg-primary text-white hover:bg-primary/90 px-8 py-3 text-lg rounded-md min-h-[44px] touch-manipulation"
            >
              {t.backToWebsite}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <Footer
          language={language}
          onJobSeekerClick={onHome}
          onEmployerClick={onSwitchToEmployer}
          onLegalClick={onLegalClick}
        />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-gray-50 safe-area-bottom">
      <header className="w-full bg-white border-b border-primary/10 sticky top-0 z-50 safe-area-top">
        <div className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 max-w-7xl flex justify-between items-center overflow-x-hidden">
          <img 
            src={logoImage} 
            alt="TUMMLE Logo" 
            className="h-7 sm:h-8 w-auto object-contain cursor-pointer touch-manipulation"
            onClick={onHome}
          />
          
          {/* Mobile Hamburger Menu */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] px-2 touch-manipulation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            <button
              onClick={onSwitchToEmployer}
              className="text-sm lg:text-base font-medium underline hover:no-underline min-h-[48px] px-4 flex items-center touch-manipulation transition-colors duration-300 rounded-lg hover:bg-primary/5"
              style={{ color: '#005478' }}
            >
              {t.employerButton}
            </button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newLanguage = language === "de" ? "en" : "de";
                if (onLanguageChange) {
                  onLanguageChange(newLanguage);
                }
              }}
              className="relative overflow-hidden group flex items-center gap-2 border-primary/20 hover:bg-primary/5 min-h-[48px] px-4 hover:border-primary/40 transition-all duration-500 hover:shadow-xl rounded-xl touch-manipulation cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Languages className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm lg:text-base uppercase font-medium relative z-10">
                {language === "de" ? "EN" : "DE"}
              </span>
            </Button>
            <Button
              onClick={onHome}
              className="relative overflow-hidden group text-white px-6 lg:px-8 py-3 text-sm lg:text-base rounded-xl transition-all duration-500 min-h-[48px] shadow-2xl transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2 touch-manipulation cursor-pointer"
              style={{ backgroundColor: '#005478' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#003a55';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 84, 120, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#005478';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
              }}
            >
              <ArrowLeft className="w-4 h-4 relative z-10 group-hover:-translate-x-2 transition-transform duration-300" />
              <span className="relative z-10 whitespace-nowrap">{t.backToHome}</span>
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Dropdown Content */}
            <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-primary/10 shadow-lg z-50 sm:hidden animate-fade-in-up">
              <div className="container mx-auto px-2 xs:px-3 py-3 xs:py-4 space-y-1">
                {/* Language Selector */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    const newLanguage = language === "de" ? "en" : "de";
                    if (onLanguageChange) {
                      onLanguageChange(newLanguage);
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start h-12 px-4 text-left hover:bg-primary/5 transition-colors duration-300 touch-manipulation cursor-pointer"
                >
                  <Languages className="w-5 h-5 mr-3 text-primary" />
                  <span className="flex-1 text-primary font-medium">
                    {language === 'de' ? 'English' : 'Deutsch'}
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {language === "de" ? "EN" : "DE"}
                  </span>
                </Button>

                {/* Employer Link */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    onSwitchToEmployer();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start h-12 px-4 text-left hover:bg-primary/5 transition-colors duration-300 touch-manipulation"
                >
                  <User className="w-5 h-5 mr-3" style={{ color: '#005478' }} />
                  <span className="flex-1 font-medium" style={{ color: '#005478' }}>
                    {t.employerButton}
                  </span>
                  <ArrowRight className="w-4 h-4" style={{ color: '#005478', opacity: 0.6 }} />
                </Button>

                {/* Back to Homepage */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    onHome();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start h-12 px-4 text-left hover:bg-primary/5 transition-colors duration-300 touch-manipulation"
                >
                  <ArrowLeft className="w-5 h-5 mr-3 text-primary" />
                  <span className="flex-1 text-primary font-medium">
                    {t.backToHome}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary/60" />
                </Button>
              </div>
            </div>
          </>
        )}
      </header>

      <div className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl w-full overflow-x-hidden">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-medium text-primary mb-2">{t.registrationForm}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Preferences Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <User className="w-5 h-5" />
                {t.preferences}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Job Roles with Multi-select */}
              <div className="space-y-3">
                <Label className="text-primary font-medium">{t.jobRoles} *</Label>
                <MultiSelectDropdown
                  options={jobRoleOptions}
                  selectedItems={formData.jobRoles}
                  onItemSelect={handleRoleSelect}
                  onItemRemove={handleRoleRemove}
                  placeholder={t.selectRole}
                  searchValue={roleSearchValue}
                  setSearchValue={setRoleSearchValue}
                  hideBadges={true}
                  renderBadge={(role: RoleWithExperience, onRemove) => (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {jobRoleOptions.find(opt => opt.value === role.role)?.label}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={onRemove}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                />
                {errors.jobRoles && <p className="text-sm text-red-500">{errors.jobRoles}</p>}
              </div>

              {/* Job Roles and Experience - Mobile Responsive */}
              {formData.jobRoles.length > 0 && (
                <div className="space-y-4">
                  <Label className="text-primary font-medium">{t.jobRoles} & {t.experience} *</Label>
                  
                  {/* Mobile: Card Layout */}
                  <div className="block sm:hidden space-y-3">
                    {formData.jobRoles.map((roleData, index) => {
                      const roleLabel = jobRoleOptions.find(opt => opt.value === roleData.role)?.label;
                      return (
                        <div key={roleData.role} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-primary text-sm">
                                {roleLabel}
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-red-100 text-red-500 hover:text-red-700 touch-manipulation"
                                onClick={() => handleRoleRemove(roleData)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-medium text-gray-600">{t.experience}</Label>
                              <Select
                                value={roleData.experience}
                                onValueChange={(value) => 
                                  setFormData(prev => ({
                                    ...prev,
                                    jobRoles: prev.jobRoles.map((role, i) => 
                                      i === index ? { ...role, experience: value } : role
                                    )
                                  }))
                                }
                              >
                                <SelectTrigger className="w-full h-12">
                                  <SelectValue placeholder={t.required} />
                                </SelectTrigger>
                                <SelectContent>
                                  {experienceOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop: Table Layout */}
                  <div className="hidden sm:block border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-2/5">{t.jobRoles}</TableHead>
                          <TableHead className="w-2/5">{t.experience}</TableHead>
                          <TableHead className="w-1/5 text-center">{t.actions}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.jobRoles.map((roleData, index) => {
                          const roleLabel = jobRoleOptions.find(opt => opt.value === roleData.role)?.label;
                          return (
                            <TableRow key={roleData.role}>
                              <TableCell className="font-medium">
                                {roleLabel}
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={roleData.experience}
                                  onValueChange={(value) => 
                                    setFormData(prev => ({
                                      ...prev,
                                      jobRoles: prev.jobRoles.map((role, i) => 
                                        i === index ? { ...role, experience: value } : role
                                      )
                                    }))
                                  }
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t.required} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {experienceOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-center">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-red-100 text-red-500 hover:text-red-700 touch-manipulation"
                                  onClick={() => handleRoleRemove(roleData)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Geographic Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <MapPin className="w-5 h-5" />
                {t.geoAvailability}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-primary font-medium">{t.location} *</Label>
                <GooglePlacesAutocomplete
                  selectedLocations={formData.locations}
                  onLocationAdd={handleLocationAdd}
                  onLocationRemove={handleLocationRemove}
                  placeholder={t.selectLocation}
                  language={language}
                />
                
                {errors.locations && <p className="text-sm text-red-500">{errors.locations}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Time Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Clock className="w-5 h-5" />
                {t.timeAvailability}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <Label htmlFor="dateFrom" className="text-primary font-medium">{t.dateFrom} *</Label>
                  <Input
                    id="dateFrom"
                    type="date"
                    value={formData.dateFrom}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateFrom: e.target.value }))}
                  />
                  {errors.dateFrom && <p className="text-sm text-red-500">{errors.dateFrom}</p>}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="dateUntil" className="text-primary font-medium">{t.dateUntil}</Label>
                  <Input
                    id="dateUntil"
                    type="date"
                    value={formData.dateUntil}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateUntil: e.target.value }))}
                  />
                </div>
              </div>

              {/* Week Schedule - Visual Layout */}
              <div className="space-y-4">
                {/* Desktop: Label and buttons on same line */}
                <div className="hidden sm:flex justify-between items-center">
                  <Label className="text-primary font-medium">{t.weekSchedule} *</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={scheduleMode === 'allDay' ? 'default' : 'outline'}
                      size="sm"
                      onClick={selectAllDays}
                      className={scheduleMode === 'allDay' ? 'bg-primary text-white' : ''}
                    >
                      {t.selectAllDays}
                    </Button>
                    <Button
                      type="button"
                      variant={scheduleMode === 'businessHours' ? 'default' : 'outline'}
                      size="sm"
                      onClick={selectBusinessHours}
                      className={scheduleMode === 'businessHours' ? 'bg-primary text-white' : ''}
                    >
                      {t.selectBusinessHours}
                    </Button>
                  </div>
                </div>

                {/* Mobile: Label and buttons stacked */}
                <div className="block sm:hidden space-y-3">
                  <Label className="text-primary font-medium">{t.weekSchedule} *</Label>
                  <div className="flex gap-2 w-full">
                    <Button
                      type="button"
                      variant={scheduleMode === 'allDay' ? 'default' : 'outline'}
                      size="sm"
                      onClick={selectAllDays}
                      className={`flex-1 ${scheduleMode === 'allDay' ? 'bg-primary text-white' : ''}`}
                    >
                      {t.selectAllDays}
                    </Button>
                    <Button
                      type="button"
                      variant={scheduleMode === 'businessHours' ? 'default' : 'outline'}
                      size="sm"
                      onClick={selectBusinessHours}
                      className={`flex-1 ${scheduleMode === 'businessHours' ? 'bg-primary text-white' : ''}`}
                    >
                      {t.selectBusinessHours}
                    </Button>
                  </div>
                </div>

                {/* Mobile: Single Table with 3 Columns */}
                <div className="block sm:hidden border border-gray-200 rounded-lg p-2 xs:p-3 bg-white shadow-sm w-full">
                  <div className="w-full max-w-full">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 gap-1 xs:gap-2 mb-2 xs:mb-3 pb-2 xs:pb-3 border-b border-gray-200">
                      <div className="text-xs font-medium text-gray-600 text-left">
                        {language === 'de' ? 'Tag' : 'Day'}
                      </div>
                      <div className="flex justify-center" title={t.morning}>
                        <div className="bg-accent rounded-full p-1.5 xs:p-2">
                          <Sunrise className="w-3 h-3 xs:w-4 xs:h-4 text-amber-800" />
                        </div>
                      </div>
                      <div className="flex justify-center" title={t.afternoon}>
                        <div className="bg-accent rounded-full p-1.5 xs:p-2">
                          <Sun className="w-3 h-3 xs:w-4 xs:h-4 text-orange-800" />
                        </div>
                      </div>
                      <div className="flex justify-center" title={t.night}>
                        <div className="bg-accent rounded-full p-1.5 xs:p-2">
                          <Moon className="w-3 h-3 xs:w-4 xs:h-4 text-blue-800" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Table Rows */}
                    <div className="space-y-2 xs:space-y-3">
                      {days.map(day => {
                        const dayShortKey = `${day}Short` as keyof typeof t;
                        return (
                          <div key={day} className="grid grid-cols-4 gap-1 xs:gap-2 items-center">
                            <div className="text-xs font-medium text-gray-700 pr-1">
                              <span className="block">{t[dayShortKey] || t[day as keyof typeof t]}</span>
                            </div>
                            {shifts.map(shift => {
                              const scheduleItem = `${day}-${shift}`;
                              const isSelected = formData.weekSchedule.includes(scheduleItem);
                              return (
                                <div key={scheduleItem} className="flex justify-center">
                                  <Checkbox
                                    checked={isSelected}
                                    onCheckedChange={() => toggleWeekScheduleItem(scheduleItem)}
                                    className="touch-manipulation"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Desktop: Traditional Grid */}
                <div className="hidden sm:block border rounded-lg p-4">
                  <div className="grid grid-cols-8 gap-3 min-w-0">
                    {/* Header */}
                    <div></div>
                    {days.map(day => (
                      <div key={day} className="text-center font-medium text-sm p-2 text-primary">
                        {t[day as keyof typeof t].slice(0, 3)}
                      </div>
                    ))}

                    {/* Shifts */}
                    {shifts.map(shift => (
                      <div key={shift} className="contents">
                        <div className="text-sm font-medium p-2 text-right text-primary pr-4">
                          {t[`${shift}Shift` as keyof typeof t]}
                        </div>
                        {days.map(day => {
                          const scheduleItem = `${day}-${shift}`;
                          const isSelected = formData.weekSchedule.includes(scheduleItem);
                          return (
                            <div key={scheduleItem} className="flex justify-center items-center p-2">
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => toggleWeekScheduleItem(scheduleItem)}
                                className="touch-manipulation"
                              />
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                {errors.weekSchedule && <p className="text-sm text-red-500">{errors.weekSchedule}</p>}
              </div>

              {/* Hours per week - Combined Range Slider */}
              <div className="space-y-4">
                <Label className="text-primary font-medium">
                  {t.hoursPerWeek}: {formData.hoursPerWeekMin}h - {formData.hoursPerWeekMax}h
                </Label>
                <div className="px-3">
                  <Slider
                    value={[formData.hoursPerWeekMin, formData.hoursPerWeekMax]}
                    onValueChange={([min, max]) => 
                      setFormData(prev => ({ 
                        ...prev, 
                        hoursPerWeekMin: min, 
                        hoursPerWeekMax: max 
                      }))
                    }
                    max={80}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0h</span>
                    <span>80h</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education & Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <GraduationCap className="w-5 h-5" />
                {t.educationSkills}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Education Level */}
              <div className="space-y-3">
                <Label className="text-primary font-medium">{t.educationLevel} *</Label>
                <Select
                  value={formData.educationLevel}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, educationLevel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.required} />
                  </SelectTrigger>
                  <SelectContent>
                    {educationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.educationLevel && <p className="text-sm text-red-500">{errors.educationLevel}</p>}
              </div>

              {/* Languages with Multi-select */}
              <div className="space-y-3">
                <Label className="text-primary font-medium">{t.languages} *</Label>
                <MultiSelectDropdown
                  options={languageOptions}
                  selectedItems={formData.languages}
                  onItemSelect={handleLanguageSelect}
                  onItemRemove={handleLanguageRemove}
                  placeholder={t.selectLanguage}
                  searchValue={languageSearchValue}
                  setSearchValue={setLanguageSearchValue}
                  hideBadges={true}
                  renderBadge={(language: LanguageWithLevel, onRemove) => (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {languageOptions.find(opt => opt.value === language.language)?.label}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={onRemove}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                />
                {errors.languages && <p className="text-sm text-red-500">{errors.languages}</p>}
              </div>

              {/* Languages and Levels - Mobile Responsive */}
              {formData.languages.length > 0 && (
                <div className="space-y-4">
                  <Label className="text-primary font-medium">{t.languages} & {t.languageLevel} *</Label>
                  
                  {/* Mobile: Card Layout */}
                  <div className="block sm:hidden space-y-3">
                    {formData.languages.map((langData, index) => {
                      const langLabel = languageOptions.find(opt => opt.value === langData.language)?.label;
                      return (
                        <div key={langData.language} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-primary text-sm">
                                {langLabel}
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-red-100 text-red-500 hover:text-red-700 touch-manipulation"
                                onClick={() => handleLanguageRemove(langData)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-medium text-gray-600">{t.languageLevel}</Label>
                              <Select
                                value={langData.level}
                                onValueChange={(value) => 
                                  setFormData(prev => ({
                                    ...prev,
                                    languages: prev.languages.map((lang, i) => 
                                      i === index ? { ...lang, level: value } : lang
                                    )
                                  }))
                                }
                              >
                                <SelectTrigger className="w-full h-12">
                                  <SelectValue placeholder={t.required} />
                                </SelectTrigger>
                                <SelectContent>
                                  {languageLevelOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop: Table Layout */}
                  <div className="hidden sm:block border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-2/5">{t.languages}</TableHead>
                          <TableHead className="w-2/5">{t.languageLevel}</TableHead>
                          <TableHead className="w-1/5 text-center">{t.actions}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.languages.map((langData, index) => {
                          const langLabel = languageOptions.find(opt => opt.value === langData.language)?.label;
                          return (
                            <TableRow key={langData.language}>
                              <TableCell className="font-medium">
                                {langLabel}
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={langData.level}
                                  onValueChange={(value) => 
                                    setFormData(prev => ({
                                      ...prev,
                                      languages: prev.languages.map((lang, i) => 
                                        i === index ? { ...lang, level: value } : lang
                                      )
                                    }))
                                  }
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t.required} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {languageLevelOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-center">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-red-100 text-red-500 hover:text-red-700 touch-manipulation"
                                  onClick={() => handleLanguageRemove(langData)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}


            </CardContent>
          </Card>

          {/* Driving Licenses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Shield className="w-5 h-5" />
                {t.drivingLicenses}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Driving Licenses */}
              <div className="space-y-3">
                <Label className="text-primary font-medium">{t.drivingLicenses}</Label>
                <MultiSelectDropdown
                  options={drivingLicenseOptions}
                  selectedItems={formData.drivingLicenses}
                  onItemSelect={handleLicenseSelect}
                  onItemRemove={handleLicenseRemove}
                  placeholder={t.selectLicense}
                  searchValue={licenseSearchValue}
                  setSearchValue={setLicenseSearchValue}
                  renderBadge={(license: string, onRemove) => (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {drivingLicenseOptions.find(opt => opt.value === license)?.label}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={onRemove}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Professional Licenses & Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <GraduationCap className="w-5 h-5" />
                {t.professionalCertifications}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Professional Certifications */}
              <div className="space-y-3">
                <Label className="text-primary font-medium">{t.professionalCertifications}</Label>
                <MultiSelectDropdown
                  options={professionalCertificationOptions}
                  selectedItems={formData.professionalCertifications}
                  onItemSelect={handleCertificationSelect}
                  onItemRemove={handleCertificationRemove}
                  placeholder={language === 'de' ? 'Zertifikat auswählen...' : 'Select certification...'}
                  searchValue={certificationSearchValue}
                  setSearchValue={setCertificationSearchValue}
                  renderBadge={(certification: string, onRemove) => (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {professionalCertificationOptions.find(opt => opt.value === certification)?.label}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={onRemove}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <User className="w-5 h-5" />
                {t.personalInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Social Media Links */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-primary font-medium">{language === 'de' ? 'Social Media Profile' : 'Social Media Profiles'}</Label>
                  <MultiSelectDropdown
                    options={socialMediaPlatformOptions}
                    selectedItems={formData.socialMediaLinks}
                    onItemSelect={handleSocialMediaSelect}
                    onItemRemove={handleSocialMediaRemove}
                    placeholder={language === 'de' ? 'Plattform auswählen...' : 'Select platform...'}
                    searchValue={socialMediaSearchValue}
                    setSearchValue={setSocialMediaSearchValue}
                    hideBadges={true}
                    renderBadge={(link: SocialMediaLink, onRemove) => (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {socialMediaPlatformOptions.find(opt => opt.value === link.platform)?.label}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={onRemove}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                  />
                </div>

                {/* Social Media Links - Mobile Responsive */}
                {formData.socialMediaLinks.length > 0 && (
                  <div className="space-y-4">
                    <Label className="text-primary font-medium">{language === 'de' ? 'Social Media Profile & URLs' : 'Social Media Profiles & URLs'}</Label>
                    
                    {/* Mobile: Card Layout */}
                    <div className="block sm:hidden space-y-3">
                      {formData.socialMediaLinks.map((linkData, index) => {
                        const platformLabel = socialMediaPlatformOptions.find(opt => opt.value === linkData.platform)?.label;
                        const getIcon = (platform: string) => {
                          switch (platform) {
                            case 'facebook': return <Facebook className="w-5 h-5 text-blue-600" />;
                            case 'linkedin': return <Linkedin className="w-5 h-5 text-blue-700" />;
                            case 'instagram': return <Instagram className="w-5 h-5 text-pink-600" />;
                            default: return null;
                          }
                        };
                        return (
                          <div key={linkData.platform} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {getIcon(linkData.platform)}
                                  <span className="font-medium text-primary text-sm">
                                    {platformLabel}
                                  </span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-red-100 text-red-500 hover:text-red-700 touch-manipulation"
                                  onClick={() => handleSocialMediaRemove(linkData)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs font-medium text-gray-600">URL</Label>
                                <Input
                                  type="url"
                                  value={linkData.url}
                                  onChange={(e) => 
                                    setFormData(prev => ({
                                      ...prev,
                                      socialMediaLinks: prev.socialMediaLinks.map((link, i) => 
                                        i === index ? { ...link, url: e.target.value } : link
                                      )
                                    }))
                                  }
                                  placeholder={`https://${linkData.platform}.com/your-profile`}
                                  className="h-12"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Desktop: Table Layout */}
                    <div className="hidden sm:block border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-2/5">{language === 'de' ? 'Plattform' : 'Platform'}</TableHead>
                            <TableHead className="w-2/5">URL</TableHead>
                            <TableHead className="w-1/5 text-center">{t.actions}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formData.socialMediaLinks.map((linkData, index) => {
                            const platformLabel = socialMediaPlatformOptions.find(opt => opt.value === linkData.platform)?.label;
                            const getIcon = (platform: string) => {
                              switch (platform) {
                                case 'facebook': return <Facebook className="w-4 h-4 text-blue-600" />;
                                case 'linkedin': return <Linkedin className="w-4 h-4 text-blue-700" />;
                                case 'instagram': return <Instagram className="w-4 h-4 text-pink-600" />;
                                default: return null;
                              }
                            };
                            return (
                              <TableRow key={linkData.platform}>
                                <TableCell>
                                  <div className="flex items-center gap-2 font-medium">
                                    {getIcon(linkData.platform)}
                                    {platformLabel}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="url"
                                    value={linkData.url}
                                    onChange={(e) => 
                                      setFormData(prev => ({
                                        ...prev,
                                        socialMediaLinks: prev.socialMediaLinks.map((link, i) => 
                                          i === index ? { ...link, url: e.target.value } : link
                                        )
                                      }))
                                    }
                                    placeholder={`https://${linkData.platform}.com/your-profile`}
                                    className="w-full"
                                  />
                                </TableCell>
                                <TableCell className="text-center">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-red-100 text-red-500 hover:text-red-700 touch-manipulation"
                                    onClick={() => handleSocialMediaRemove(linkData)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>

              {/* Name and Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-primary font-medium">{t.firstName} *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-primary font-medium">{t.lastName} *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                  {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-primary font-medium">{t.email} *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-primary font-medium">{t.phone}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="mobile" className="text-primary font-medium">{t.mobile}</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                  />
                </div>
              </div>


            </CardContent>
          </Card>

          {/* Privacy Policy & Consent */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Shield className="w-5 h-5" />
                {t.privacyPolicySection}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Consent Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="dataConsent"
                    checked={formData.dataConsent}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, dataConsent: checked as boolean }))
                    }
                    className="flex-shrink-0 mt-0.5"
                  />
                  <Label htmlFor="dataConsent" className="cursor-pointer leading-relaxed text-sm flex-1">
                    {t.dataConsent} *
                  </Label>
                </div>
                {errors.dataConsent && <p className="text-sm text-red-500 ml-6 sm:ml-7">{errors.dataConsent}</p>}

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="termsConsent"
                    checked={formData.termsConsent}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, termsConsent: checked as boolean }))
                    }
                    className="flex-shrink-0 mt-0.5"
                  />
                  <Label htmlFor="termsConsent" className="cursor-pointer leading-relaxed text-sm flex-1">
                    {t.termsConsent} *
                  </Label>
                </div>
                {errors.termsConsent && <p className="text-sm text-red-500 ml-6 sm:ml-7">{errors.termsConsent}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white hover:bg-primary/90 px-8 py-3 text-lg rounded-md min-w-[200px] min-h-[56px] touch-manipulation"
            >
              {isSubmitting ? t.submitting : t.submit}
            </Button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <Footer
        language={language}
        onJobSeekerClick={onHome}
        onEmployerClick={onSwitchToEmployer}
        onLegalClick={onLegalClick}
      />
    </div>
  );
}
