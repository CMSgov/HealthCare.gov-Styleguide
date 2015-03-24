var app = {};
app.search = [];
app.sidebarData = [];
var manualSelect = false;

app.topics = {
  'en': {
    'getting-lower-costs-on-coverage': 'Save Money on Coverage'
      ,'young-adults': 'Young Adults'
      ,'using-the-marketplace': 'Using the Marketplace'
      ,'the-marketplace-and-you': 'The Marketplace and You'
      ,'rights-protections-and-the-law': 'Rights, Protections, and the Law'
      ,'prevention': 'Prevention and Getting Care'
      ,'other-health-insurance-programs': 'Have Medicaid, CHIP, or Medicare Coverage?'
      ,'if-you-have-health-insurance': 'Have Individual Coverage Outside the Marketplace?'
      ,'health-insurance-marketplace': 'Marketplace Overview'
      ,'health-insurance-basics': 'Health Insurance Basics'
      ,'have-marketplace-coverage': 'Have Marketplace Coverage?'
      ,'have-job-based-coverage': 'Have Job-Based Coverage?'
      ,'get-started': 'Get Started'
      ,'businesses': 'Businesses'
  },

  'es': {
    'young-adults': 'JÃ³venes'
      ,'using-the-marketplace': 'Usando el Mercado de seguros'
      ,'the-marketplace-and-you': 'El Mercado y Usted'
      ,'rights-protections-and-the-law': 'Derechos, Protecciones y la Ley'
      ,'prevention': 'PrevenciÃ³n y obtener cuidado'
      ,'other-health-insurance-programs': 'Â¿Tiene cobertura de Medicaid, CHIP o Medicare?'
      ,'if-you-have-health-insurance': 'Â¿Tiene cobertura mÃ©dica individual fuera del Mercado?'
      ,'health-insurance-marketplace': 'El Mercado de Seguros MÃ©dicos'
      ,'health-insurance-basics': 'Conceptos bÃ¡sicos sobre los seguros mÃ©dicos'
      ,'have-marketplace-coverage': 'Â¿Tiene cobertura mÃ©dica del Mercado?'
      ,'have-job-based-coverage': 'Â¿Tiene cobertura mÃ©dica a travÃ©s del empleador?'
      ,'getting-lower-costs-on-coverage': 'Ahorros en los costos de cobertura'
      ,'get-started': 'Comenzar'
      ,'businesses': 'Empresas'
  }
};


app.steps = {
  'en': {
    '/help/marketplace-account': 'Marketplace Account'
      ,'/help/enroll-in-a-plan': 'Enroll in a Plan'
      ,'/help/employer-apply-for-coverage': 'Employer Apply for Coverage'
      ,'/help/employee-apply-for-coverage': 'Employee Apply for Coverage'
      ,'/help/applying-for-coverage': 'Applying for Coverage'
  },
  'es': {
    '/es/help/marketplace-account': 'Cuenta del Mercado'
      ,'/es/help/enroll-in-a-plan': 'InscrÃ­base en un Plan'
      ,'/es/help/employer-apply-for-coverage': 'Empleador Solicite Cobertura'
      ,'/es/help/employee-apply-for-coverage': 'Empleado Solicite Cobertura'
      ,'/es/help/applying-for-coverage': 'Solicitando Cobertura'
  }
};

app.topContent = {
  'en': "<li><a href='/help/what-if-i-m-currently-enrolled-in-the-pre-existing-condition-insurance-plan-pcip' class='row-fluid'><div class='span2'></div><div class='span10'>What if I'm currently enrolled in the Pre-Existing Condition Insurance Plan (PCIP)?</div></a></li><li><a href='/will-i-qualify-to-save-on-monthly-premiums' class='row-fluid'><div class='span2'></div><div class='span10'>Will I qualify for lower costs on monthly premiums?</div></a></li><li><a href='/what-is-the-marketplace-in-my-state' class='row-fluid'><div class='span2'></div><div class='span10'>What is the Marketplace in my state? </div></a></li>"
    ,
  'es': "<li><a href='/es/will-i-qualify-to-save-on-monthly-premiums' class='row-fluid'><div class='span2'></div><div class='span10'>Â¿AhorrarÃ© dinero en mis primas mensuales?</div></a></li><li><a href='/es/what-is-the-marketplace-in-my-state' class='row-fluid'><div class='span2'></div><div class='span10'>Â¿QuÃ© es el Mercado de seguros en mi estado?</div></a></li><li><a href='/es/how-do-i-apply-for-marketplace-coverage' class='row-fluid'><div class='span2'></div><div class='span10'>Â¿QuÃ© hago para conseguir un seguro en el Mercado?</div></a></li>"
};

app.popularContent = { 'en':[],'es':[] };
app.popularContent['en'].push("<li><a href='/if-i-m-a-college-student-what-do-i-need-to-know-about-the-marketplace'>If Iâ€™m a college student, what do I need to know about the Marketplace? </a></li>");
app.popularContent['en'].push("<li><a href='/what-if-i-have-new-medicaid-or-chip-coverage'>What if I have new Medicaid or CHIP coverage?</a></li>");
app.popularContent['en'].push("<li><a href='/using-your-new-marketplace-coverage'>Using your new insurance coverage</a></li>");
app.popularContent['en'].push("<li><a href='/how-to-have-the-best-experience-with-healthcare-gov'>Tips to help you enroll in Marketplace coverage</a></li>");
app.popularContent['en'].push("<li><a href='/will-i-qualify-to-save-on-monthly-premiums'>Will I qualify for lower costs on monthly premiums?</a></li>");
app.popularContent['en'].push("<li><a href='/what-is-the-marketplace-in-my-state'>What is the Marketplace in my state? </a></li>");
app.popularContent['en'].push("<li><a href='/how-do-i-apply-for-marketplace-coverage'>How do I apply for Marketplace coverage?</a></li>");
app.popularContent['en'].push("<li><a href='/how-can-i-get-an-estimate-of-costs-and-savings-on-marketplace-health-insurance'>How can I find out if I can get lower costs on coverage?</a></li>");
app.popularContent['en'].push("<li><a href='/what-if-my-current-individual-plan-is-changing-or-not-being-offered-in-2014'>What if my individual health insurance plan is changing or being cancelled?</a></li>");
app.popularContent['es'].push("<li><a href='/es/what-if-i-have-new-medicaid-or-chip-coverage'>Â¿Y si tengo nueva cobertura de Medicaid o CHIP?</a></li>");
app.popularContent['es'].push("<li><a href='/es/using-your-new-marketplace-coverage'>CÃ³mo utilizar su nueva cobertura del Mercado de seguros</a></li>");
app.popularContent['es'].push("<li><a href='/es/how-to-have-the-best-experience-with-healthcare-gov'>Consejos prÃ¡cticos que le ayudan a inscribirse para obtener cobertura del Mercado de seguros</a></li>");
app.popularContent['es'].push("<li><a href='/es/will-i-qualify-to-save-on-monthly-premiums'>Â¿AhorrarÃ© dinero en mis primas mensuales?</a></li>");
app.popularContent['es'].push("<li><a href='/es/what-is-the-marketplace-in-my-state'>Â¿QuÃ© es el Mercado de seguros en mi estado?</a></li>");
app.popularContent['es'].push("<li><a href='/es/how-do-i-apply-for-marketplace-coverage'>Â¿QuÃ© hago para conseguir un seguro en el Mercado?</a></li>");
app.popularContent['es'].push("<li><a href='/es/how-can-i-get-an-estimate-of-costs-and-savings-on-marketplace-health-insurance'>Â¿CÃ³mo puedo obtener un estimado de los costos y ahorros para los seguros mÃ©dicos disponibles en el Mercado?</a></li>");
app.popularContent['es'].push("<li><a href='/es/what-if-my-current-individual-plan-is-changing-or-not-being-offered-in-2014'>Â¿QuÃ© pasa si mi plan estÃ¡ cambiando o siendo cancelado?</a></li>");
app.popularContent['es'].push("<li><a href='/es/what-income-and-household-information-do-i-provide-when-i-apply-for-marketplace-coverage'>Â¿QuÃ© informaciÃ³n sobre el ingreso y el hogar debo proporcionar cuando solicito cobertura del Mercado de Seguros?</a></li>");
