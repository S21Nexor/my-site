export interface Identity {
    id: string
    fullName: string
    idNumber: string
    dateOfBirth: string
    nationality: string
    phoneNumber: string
    email: string
    address: string
    createdAt: string
  }
  
  export interface IraqiCustomsData {
    id?: string
    documentNumber: string
    documentType: "iraqi-customs"
    date: string
    referenceNumber: string
    receiptNumber: string
    ownerName: string
    ownerId: string
    vehicleMake: string
    vehicleModel: string
    vehicleYear: string
    vehicleColor: string
    chassisNumber: string
    customsFee: string
    customsFeeReceipt: string
    issuedBy: string
    issueDate: string
    notes: string
    createdAt: string
    receiptId:string
  }
  
  export interface SaudiCustomsData {
    id?: string
    documentNumber: string
    documentType: "saudi-customs"
    manifestNumber: string
    date: string
    ownerName: string
    mobileNumber: string
    centerName: string
    chassisNumber: string
    vehicleMake: string
    vehicleModel: string
    vehicleYear: string
    vehicleColor: string
    numberOfDoors: string
    regionalSpecs: string
    transmissionType: string
    bodyType: string
    bodyCondition: string
    mechanicalCondition: string
    fuelType: string
    numberOfCylinders: string
    horsePower: string
    features: string
    approvedCountries: string
    createdAt: string
    ownerPhone:string
    year?:string
    color?:string
  }
  
  export interface InsuranceData {
    id?: string
    documentType: "insurance"
    policyNumber: string
    ownerName: string
    certificateNumber: string
    registrationNumber: string
    companyName: string
    companyNameAr: string
    ownerPOBox: string
    ownerCity: string
    policyDate: string
    insurancePeriodFrom: string
    coverageType: string
    vehicleMake: string
    vehicleModel: string
    vehicleYear: string
    chassisNumber: string
    engineNumber: string
    numberOfCylinders: string
    numberOfPassengers: string
    agencyRepair: string
    vehicleValue: string
    deductibles: string
    remarks: string
    validityNote: string
    feeNote: string
    issueDate: string
    createdAt: string
  }
  
  export interface RegistrationData {
    id?: string
    documentType: "registration"
    ministry: string
    ministryAr: string
    department: string
    departmentAr: string
    licenseType: string
    licenseTypeEn: string
    ownerName: string
    ownerId: string
    vehicleMake: string
    vehicleModel: string
    vehicleYear: string
    vehicleColor: string
    registrationNumber: string
    serialNumber: string
    note: string
    createdAt: string
  }
  
