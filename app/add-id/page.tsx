"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { ArrowRight, Plus, Loader2 } from "lucide-react"
import Link from "next/link"
import type {
  Identity,
  IraqiCustomsData,
  SaudiCustomsData,
  InsuranceData,
} from "@/types/documents"

export default function AddDataPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"identity" | "iraqi" | "saudi" | "insurance" | "registration">("identity")

  // Identity form state
  const [identity, setIdentity] = useState<Omit<Identity, "id" | "createdAt">>({
    fullName: "",
    idNumber: "",
    dateOfBirth: "",
    nationality: "السعودية",
    phoneNumber: "",
    email: "",
    address: "",
  })

// Iraqi Customs form state
const [iraqiCustoms, setIraqiCustoms] = useState<Omit<IraqiCustomsData | any, "id" | "createdAt">>({
  documentNumber: "ERT-89866",
  documentType: "iraqi-customs",
  date: "11/10/2025",
  referenceNumber: "22141234",
  receiptNumber: "22141234",
  ownerName: identity.fullName,
  ownerId: "121212444",
  vehicleMake: "Lexus",
  vehicleModel: "LX570s",
  vehicleYear: "2025",
  vehicleColor: "White / Pearl White",
  chassisNumber: "58abz1b15ku036714",
  customsFee: "7,500,000 IQD",
  customsFeeReceipt: "",
  issuedBy: "General Commission for Customs – Republic of Iraq",
  issueDate: "2025/09/25",
  notes: "استيفاء الرسوم الجمركية الخاصة بالمركبة المسجلة – الرقم 6588990، المبلغ 7,500,000 د.ع بتاريخ 2025/09/25",
})

// Saudi Customs form state
const [saudiCustoms, setSaudiCustoms] = useState<Omit<SaudiCustomsData | any, "id" | "createdAt">>({
  documentNumber: "102/10",
  documentType: "saudi-customs",
  manifestNumber: "6312002",
  date: "2025/09/09",
  ownerName: "عبد الكريم كاظم المنصوري",
  mobileNumber: "07801263846",
  centerName: "مركز الإصدار - المملكة العربية السعودية",
  chassisNumber: "58abz1b15ku036714",
  vehicleMake: "Lexus",
  vehicleModel: "LX570",
  vehicleYear: "2025",
  vehicleColor: "Pearl White",
  numberOfDoors: "4",
  regionalSpecs: "مواصفات خليجية",
  transmissionType: "نقل أوتوماتيكي",
  bodyType: "جيب لكزس",
  bodyCondition: "لا يوجد عيوب",
  mechanicalCondition: "ممتازة من الداخل والخارج",
  fuelType: "بنزين",
  numberOfCylinders: "8",
  horsePower: "409 - 309 hp",
  features:
    "Air conditioning, AM/FM radio, ABS, Bluetooth, Cruise Control, Front airbags, 4WD, Keyless entry/start, Power mirrors/windows/locks, Rear view camera, Premium audio system",
  approvedCountries:
    "السعودية / الكويت / الاردن / العراق / قطر / مصر / سوريا / سلطنة عمان / الامارات",
})

  // Insurance form state
  const [insurance, setInsurance] = useState<Omit<InsuranceData, "id" | "createdAt">>({
    documentType: "insurance",
    policyNumber: "100096300452021000",
    certificateNumber: "100096300452021000",
    registrationNumber: "195660733239",
    companyName: "Damaan Islamic Insurance Company",
    companyNameAr: "شركة الضمان للتأمين الإسلامي",
    ownerName: "عبد الكريم كاظم المنصوري",
    ownerPOBox: "",
    ownerCity: "الرياض",
    policyDate: "2025",
    insurancePeriodFrom: "",
    coverageType: "TP + Own Damage",
    vehicleMake: "Lexus",
    vehicleModel: "LX570s",
    vehicleYear: "2025",
    chassisNumber: "58abz1b15ku036714",
    engineNumber: "",
    numberOfCylinders: "8",
    numberOfPassengers: "8",
    agencyRepair: "Agency Repair allowed (per doc)",
    vehicleValue: "",
    deductibles: "",
    remarks:
      "own damage, passenger liability, Agency Repairs, Third party Liability, Road Side Assistance",
    validityNote: "وثيقة تأمين الزامي لمدة 10 ايام من الحدود",
    feeNote: "يتم استرداد قيمة التأمين (2,150,000) في منفذ صفوان",
    issueDate: ""
  })

  // Registration form state
  const [registration, setRegistration] = useState({
    documentType: "registration",
    ministry: "MINISTRY OF INTERIOR",
    ministryAr: "وزارة الداخلية / الأمن العام",
    department: "PUBLIC SECURITY/TRAFFIC DEPT.",
    departmentAr: "الإدارة العامة للمرور",
    licenseType: "رخصة سير",
    licenseTypeEn: "VEHICLES REGISTRATION",
    ownerName: "ستار داود سلمان زنكوشي",
    ownerId: "",
    vehicleMake: "Lexus",
    vehicleModel: "LX570s",
    vehicleYear: "2025",
    vehicleColor: "White / Pearl White",
    registrationNumber: "195660733239",
    serialNumber: "SN 05003817865754",
    note: "رخصة سائق رسميه صادره من وزارة الداخليه السعوديه حيث يتم نقل المركبة المسجله الى اسم المالك عبر المنافذ الحدوديه لدوله العراق"
  });
  

  const handleSubmitIdentity = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
addDoc(collection(db, "visitors")
        ...identity,
        createdAt: new Date().toISOString(),
      })
      alert("تم إضافة الهوية بنجاح!")
      setIdentity({
        fullName: "",
        idNumber: "",
        dateOfBirth: "",
        nationality: "السعودية",
        phoneNumber: "",
        email: "",
        address: "",
      })
    } catch (error) {
      console.error("Error adding identity:", error)
      alert("حدث خطأ أثناء إضافة الهوية")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitIraqiCustoms = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(visitors "visitors"), {
        ...iraqiCustoms,
        createdAt: new Date().toISOString(),
      })
      alert("تم إضافة وثيقة الجمارك العراقية بنجاح!")
    } catch (error) {
      console.error("Error adding Iraqi customs:", error)
      alert("حدث خطأ أثناء إضافة الوثيقة")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitSaudiCustoms = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(visitors "visitors"), {
        ...saudiCustoms,
        createdAt: new Date().toISOString(),
      })
      alert("تم إضافة وثيقة الجمارك السعودية بنجاح!")
    } catch (error) {
      console.error("Error adding Saudi customs:", error)
      alert("حدث خطأ أثناء إضافة الوثيقة")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitInsurance = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(visitors "visitors"), {
        ...insurance,
        createdAt: new Date().toISOString(),
      })
      alert("تم إضافة وثيقة التأمين بنجاح!")
    } catch (error) {
      console.error("Error adding insurance:", error)
      alert("حدث خطأ أثناء إضافة الوثيقة")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(visitors "visitors"), {
        ...registration,
        createdAt: new Date().toISOString(),
      })
      alert("تم إضافة رخصة السير بنجاح!")
    } catch (error) {
      console.error("Error adding registration:", error)
      alert("حدث خطأ أثناء إضافة الوثيقة")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">إضافة بيانات جديدة</h1>
              <p className="text-lg text-muted-foreground">إدخال بيانات العملاء والوثائق إلى النظام</p>
            </div>
            <Link href="/">
              <Button variant="outline" size="lg">
                <ArrowRight className="ml-2 h-5 w-5" />
                العودة للرئيسية
              </Button>
            </Link>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <Button
              variant={activeTab === "identity" ? "default" : "outline"}
              onClick={() => setActiveTab("identity")}
              className="whitespace-nowrap"
            >
              الهوية الشخصية
            </Button>
            <Button
              variant={activeTab === "iraqi" ? "default" : "outline"}
              onClick={() => setActiveTab("iraqi")}
              className="whitespace-nowrap"
            >
              الجمارك العراقية
            </Button>
            <Button
              variant={activeTab === "saudi" ? "default" : "outline"}
              onClick={() => setActiveTab("saudi")}
              className="whitespace-nowrap"
            >
              الجمارك السعودية
            </Button>
            <Button
              variant={activeTab === "insurance" ? "default" : "outline"}
              onClick={() => setActiveTab("insurance")}
              className="whitespace-nowrap"
            >
              التأمين
            </Button>
            <Button
              variant={activeTab === "registration" ? "default" : "outline"}
              onClick={() => setActiveTab("registration")}
              className="whitespace-nowrap"
            >
              رخصة السير
            </Button>
          </div>

          {/* Identity Form */}
          {activeTab === "identity" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">إضافة هوية شخصية</CardTitle>
                <CardDescription>أدخل المعلومات الشخصية للعميل</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitIdentity} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">الاسم الكامل *</Label>
                      <Input
                        id="fullName"
                        value={identity.fullName}
                        onChange={(e) => setIdentity({ ...identity, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">رقم الهوية *</Label>
                      <Input
                        id="idNumber"
                        value={identity.idNumber}
                        onChange={(e) => setIdentity({ ...identity, idNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">تاريخ الميلاد *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={identity.dateOfBirth}
                        onChange={(e) => setIdentity({ ...identity, dateOfBirth: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality">الجنسية *</Label>
                      <Input
                        id="nationality"
                        value={identity.nationality}
                        onChange={(e) => setIdentity({ ...identity, nationality: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">رقم الهاتف *</Label>
                      <Input
                        id="phoneNumber"
                        value={identity.phoneNumber}
                        onChange={(e) => setIdentity({ ...identity, phoneNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={identity.email}
                        onChange={(e) => setIdentity({ ...identity, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">العنوان *</Label>
                    <textarea
                      id="address"
                      value={identity.address}
                      onChange={(e) => setIdentity({ ...identity, address: e.target.value })}
                      required
                      rows={3}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Plus className="ml-2 h-5 w-5" />
                        إضافة الهوية
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Iraqi Customs Form */}
          {activeTab === "iraqi" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">إضافة وثيقة جمارك عراقية</CardTitle>
                <CardDescription>أدخل معلومات التخليص الجمركي العراقي</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitIraqiCustoms} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="iraqiDocNumber">رقم الوثيقة *</Label>
                      <Input
                        id="iraqiDocNumber"
                        value={iraqiCustoms.documentNumber}
                        onChange={(e) => setIraqiCustoms({ ...iraqiCustoms, documentNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iraqiDate">التاريخ *</Label>
                      <Input
                        id="iraqiDate"
                        type="date"
                        value={iraqiCustoms.date}
                        onChange={(e) => setIraqiCustoms({ ...iraqiCustoms, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iraqiRefNumber">رقم المرجع *</Label>
                      <Input
                        id="iraqiRefNumber"
                        value={iraqiCustoms.referenceNumber}
                        onChange={(e) => setIraqiCustoms({ ...iraqiCustoms, referenceNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iraqiReceiptNumber">رقم الوصل *</Label>
                      <Input
                        id="iraqiReceiptNumber"
                        value={iraqiCustoms.receiptNumber}
                        onChange={(e) => setIraqiCustoms({ ...iraqiCustoms, receiptNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iraqiOwnerName">اسم المالك *</Label>
                      <Input
                        id="iraqiOwnerName"
                        value={iraqiCustoms.ownerName}
                        onChange={(e) => setIraqiCustoms({ ...iraqiCustoms, ownerName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iraqiOwnerId">رقم هوية المالك *</Label>
                      <Input
                        id="iraqiOwnerId"
                        value={iraqiCustoms.ownerId}
                        onChange={(e) => setIraqiCustoms({ ...iraqiCustoms, ownerId: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iraqiVehicleMake">نوع المركبة *</Label>
                      <Input
                        id="iraqiVehicleMake"
                        value={iraqiCustoms.vehicleMake}
                        onChange={(e) => setIraqiCustoms({ ...iraqiCustoms, vehicleMake: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iraqiVehicleModel">الموديل *</Label>
                      <Input
                        id="iraqiVehicleModel"
                        value={iraqiCustoms.vehicleModel}
                        onChange={(e) => setIraqiCustoms({ ...iraqiCustoms, vehicleModel: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iraqiVehicleYear">سنة الصنع *</Label>
                      <Input
                        id="iraqiVehicleYear"
                        value={iraqiCustoms.vehicleYear}
                        onChange={(e) => setIraqiCustoms({ ...iraqiCustoms, vehicleYear: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iraqiVehicleColor">اللون *</Label>
                      <Input
                        id="iraqiVehicleColor"
                        value={iraqiCustoms.vehicleColor}
                        onChange={(e) => setIraqiCustoms({ ...iraqiCustoms, vehicleColor: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iraqiChassisNumber">رقم الشاسيه *</Label>
                      <Input
                        id="iraqiChassisNumber"
                        value={iraqiCustoms.chassisNumber}
                        onChange={(e) => setIraqiCustoms({ ...iraqiCustoms, chassisNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iraqiCustomsFee">الرسم الجمركي *</Label>
                      <Input
                        id="iraqiCustomsFee"
                        value={iraqiCustoms.customsFee}
                        onChange={(e) => setIraqiCustoms({ ...iraqiCustoms, customsFee: e.target.value })}
                        required
                        placeholder="7,500,000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="iraqiNotes">ملاحظات</Label>
                    <textarea
                      id="iraqiNotes"
                      value={iraqiCustoms.notes}
                      onChange={(e) => setIraqiCustoms({ ...iraqiCustoms, notes: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Plus className="ml-2 h-5 w-5" />
                        إضافة الوثيقة
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Saudi Customs Form */}
          {activeTab === "saudi" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">إضافة وثيقة جمارك سعودية</CardTitle>
                <CardDescription>أدخل معلومات تصريح المرور الترانزيت</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitSaudiCustoms} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="saudiDocNumber">رقم الوثيقة *</Label>
                      <Input
                        id="saudiDocNumber"
                        value={saudiCustoms.documentNumber}
                        onChange={(e) => setSaudiCustoms({ ...saudiCustoms, documentNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="saudiManifestNumber">رقم المنافست *</Label>
                      <Input
                        id="saudiManifestNumber"
                        value={saudiCustoms.manifestNumber}
                        onChange={(e) => setSaudiCustoms({ ...saudiCustoms, manifestNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="saudiDate">التاريخ *</Label>
                      <Input
                        id="saudiDate"
                        type="date"
                        value={saudiCustoms.date}
                        onChange={(e) => setSaudiCustoms({ ...saudiCustoms, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="saudiOwnerName">اسم المالك *</Label>
                      <Input
                        id="saudiOwnerName"
                        value={saudiCustoms.ownerName}
                        onChange={(e) => setSaudiCustoms({ ...saudiCustoms, ownerName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="saudiMobileNumber">رقم الجوال *</Label>
                      <Input
                        id="saudiMobileNumber"
                        value={saudiCustoms.mobileNumber}
                        onChange={(e) => setSaudiCustoms({ ...saudiCustoms, mobileNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="saudiChassisNumber">رقم الشاسيه *</Label>
                      <Input
                        id="saudiChassisNumber"
                        value={saudiCustoms.chassisNumber}
                        onChange={(e) => setSaudiCustoms({ ...saudiCustoms, chassisNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="saudiVehicleMake">نوع المركبة *</Label>
                      <Input
                        id="saudiVehicleMake"
                        value={saudiCustoms.vehicleMake}
                        onChange={(e) => setSaudiCustoms({ ...saudiCustoms, vehicleMake: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="saudiVehicleModel">الموديل *</Label>
                      <Input
                        id="saudiVehicleModel"
                        value={saudiCustoms.vehicleModel}
                        onChange={(e) => setSaudiCustoms({ ...saudiCustoms, vehicleModel: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="saudiVehicleYear">سنة الصنع *</Label>
                      <Input
                        id="saudiVehicleYear"
                        value={saudiCustoms.vehicleYear}
                        onChange={(e) => setSaudiCustoms({ ...saudiCustoms, vehicleYear: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="saudiVehicleColor">اللون *</Label>
                      <Input
                        id="saudiVehicleColor"
                        value={saudiCustoms.vehicleColor}
                        onChange={(e) => setSaudiCustoms({ ...saudiCustoms, vehicleColor: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="saudiFeatures">المواصفات والميزات</Label>
                    <textarea
                      id="saudiFeatures"
                      value={saudiCustoms.features}
                      onChange={(e) => setSaudiCustoms({ ...saudiCustoms, features: e.target.value })}
                      rows={4}
                      placeholder="Air conditioning, AM/FM radio, Anti-lock brakes/ABS..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Plus className="ml-2 h-5 w-5" />
                        إضافة الوثيقة
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Insurance Form */}
          {activeTab === "insurance" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">إضافة وثيقة تأمين</CardTitle>
                <CardDescription>أدخل معلومات وثيقة التأمين</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitInsurance} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="insurancePolicyNumber">رقم الوثيقة *</Label>
                      <Input
                        id="insurancePolicyNumber"
                        value={insurance.policyNumber}
                        onChange={(e) => setInsurance({ ...insurance, policyNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceRegistrationNumber">رقم التسجيل *</Label>
                      <Input
                        id="insuranceRegistrationNumber"
                        value={insurance.registrationNumber}
                        onChange={(e) => setInsurance({ ...insurance, registrationNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceOwnerName">اسم المالك *</Label>
                      <Input
                        id="insuranceOwnerName"
                        value={insurance.ownerName}
                        onChange={(e) => setInsurance({ ...insurance, ownerName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurancePolicyDate">تاريخ الوثيقة *</Label>
                      <Input
                        id="insurancePolicyDate"
                        type="date"
                        value={insurance.policyDate}
                        onChange={(e) => setInsurance({ ...insurance, policyDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceVehicleMake">نوع المركبة *</Label>
                      <Input
                        id="insuranceVehicleMake"
                        value={insurance.vehicleMake}
                        onChange={(e) => setInsurance({ ...insurance, vehicleMake: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceVehicleModel">الموديل *</Label>
                      <Input
                        id="insuranceVehicleModel"
                        value={insurance.vehicleModel}
                        onChange={(e) => setInsurance({ ...insurance, vehicleModel: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceVehicleYear">سنة الصنع *</Label>
                      <Input
                        id="insuranceVehicleYear"
                        value={insurance.vehicleYear}
                        onChange={(e) => setInsurance({ ...insurance, vehicleYear: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceChassisNumber">رقم الشاسيه *</Label>
                      <Input
                        id="insuranceChassisNumber"
                        value={insurance.chassisNumber}
                        onChange={(e) => setInsurance({ ...insurance, chassisNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceVehicleValue">قيمة المركبة *</Label>
                      <Input
                        id="insuranceVehicleValue"
                        value={insurance.vehicleValue}
                        onChange={(e) => setInsurance({ ...insurance, vehicleValue: e.target.value })}
                        required
                        placeholder="2,150,000"
                      />
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Plus className="ml-2 h-5 w-5" />
                        إضافة الوثيقة
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Registration Form */}
          {activeTab === "registration" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">إضافة رخصة سير</CardTitle>
                <CardDescription>أدخل معلومات رخصة السير</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitRegistration} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="regOwnerName">اسم المالك *</Label>
                      <Input
                        id="regOwnerName"
                        value={registration.ownerName}
                        onChange={(e) => setRegistration({ ...registration, ownerName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regOwnerId">رقم الهوية *</Label>
                      <Input
                        id="regOwnerId"
                        value={registration.ownerId}
                        onChange={(e) => setRegistration({ ...registration, ownerId: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regVehicleMake">نوع المركبة *</Label>
                      <Input
                        id="regVehicleMake"
                        value={registration.vehicleMake}
                        onChange={(e) => setRegistration({ ...registration, vehicleMake: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regVehicleModel">الموديل *</Label>
                      <Input
                        id="regVehicleModel"
                        value={registration.vehicleModel}
                        onChange={(e) => setRegistration({ ...registration, vehicleModel: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regVehicleYear">سنة الصنع *</Label>
                      <Input
                        id="regVehicleYear"
                        value={registration.vehicleYear}
                        onChange={(e) => setRegistration({ ...registration, vehicleYear: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regVehicleColor">اللون *</Label>
                      <Input
                        id="regVehicleColor"
                        value={registration.vehicleColor}
                        onChange={(e) => setRegistration({ ...registration, vehicleColor: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regRegistrationNumber">رقم التسجيل *</Label>
                      <Input
                        id="regRegistrationNumber"
                        value={registration.registrationNumber}
                        onChange={(e) => setRegistration({ ...registration, registrationNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regSerialNumber">الرقم التسلسلي *</Label>
                      <Input
                        id="regSerialNumber"
                        value={registration.serialNumber}
                        onChange={(e) => setRegistration({ ...registration, serialNumber: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regNote">ملاحظات</Label>
                    <textarea
                      id="regNote"
                      value={registration.note}
                      onChange={(e) => setRegistration({ ...registration, note: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Plus className="ml-2 h-5 w-5" />
                        إضافة الوثيقة
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
