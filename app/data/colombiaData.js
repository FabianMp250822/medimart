export const departments = [
  "AMAZONAS", 
  "ANTIOQUIA", 
  "ARAUCA", 
  "ATLÁNTICO", 
  "BOGOTÁ D.C.", 
  "BOLÍVAR", 
  "BOYACÁ", 
  "CALDAS", 
  "CAQUETÁ", 
  "CASANARE", 
  "CAUCA", 
  "CESAR", 
  "CHOCÓ", 
  "CÓRDOBA", 
  "CUNDINAMARCA", 
  "GUAINÍA", 
  "GUAVIARE", 
  "HUILA", 
  "LA GUAJIRA", 
  "MAGDALENA", 
  "META", 
  "NARIÑO", 
  "NORTE DE SANTANDER", 
  "PUTUMAYO", 
  "QUINDÍO", 
  "RISARALDA", 
  "SAN ANDRÉS Y PROVIDENCIA", 
  "SANTANDER", 
  "SUCRE", 
  "TOLIMA", 
  "VALLE DEL CAUCA", 
  "VAUPÉS", 
  "VICHADA"
];

export const cities = {
  "ATLÁNTICO": [
    "BARRANQUILLA", "BARANOA", "CAMPO DE LA CRUZ", "CANDELARIA", "GALAPA", 
    "JUAN DE ACOSTA", "LURUACO", "MALAMBO", "MANATÍ", "PALMAR DE VARELA", 
    "PIOJÓ", "POLONUEVO", "PONEDERA", "PUERTO COLOMBIA", "REPELÓN", 
    "SABANAGRANDE", "SABANALARGA", "SANTA LUCÍA", "SANTO TOMÁS", "SOLEDAD", 
    "SUAN", "TUBARÁ", "USIACURÍ"
  ],
  "BOGOTÁ D.C.": ["BOGOTÁ"],
  "ANTIOQUIA": [
    "MEDELLÍN", "BELLO", "ENVIGADO", "ITAGÜÍ", "RIONEGRO", 
    "SABANETA", "APARTADÓ", "CAUCASIA", "TURBO", "CALDAS"
  ],
  "VALLE DEL CAUCA": [
    "CALI", "BUENAVENTURA", "PALMIRA", "TULUÁ", "CARTAGO", 
    "BUGA", "JAMUNDÍ", "YUMBO", "ZARZAL", "FLORIDA"
  ],
  "BOLÍVAR": [
    "CARTAGENA", "MAGANGUÉ", "ARJONA", "TURBACO", "EL CARMEN DE BOLÍVAR"
  ],
  "SANTANDER": [
    "BUCARAMANGA", "FLORIDABLANCA", "GIRÓN", "PIEDECUESTA", "BARRANCABERMEJA"
  ],
  "MAGDALENA": [
    "SANTA MARTA", "CIÉNAGA", "FUNDACIÓN", "PLATO", "EL BANCO"
  ],
  "RISARALDA": [
    "PEREIRA", "DOSQUEBRADAS", "SANTA ROSA DE CABAL", "LA VIRGINIA"
  ],
  "NORTE DE SANTANDER": [
    "CÚCUTA", "OCAÑA", "PAMPLONA", "VILLA DEL ROSARIO", "LOS PATIOS"
  ],
  "TOLIMA": [
    "IBAGUÉ", "ESPINAL", "MARIQUITA", "MELGAR", "CHAPARRAL"
  ],
  "CALDAS": [
    "MANIZALES", "LA DORADA", "CHINCHINÁ", "VILLAMARÍA", "NEIRA"
  ]
};

export function getDepartments() {
  return departments;
}

export function getCitiesByDepartment(department) {
  return cities[department] || [];
}