
Action: file_editor create /app/static_portfolio/script.js --file-text "// ============================================================
//  Gouthum Kharvi — AI/DS Portfolio  ·  Three.js + Vanilla JS
// ============================================================
import * as THREE from 'three';

const IMG = 'https://customer-assets.emergentagent.com/job_1a30dae5-366e-4fc5-a92b-7365fce0bdfe/artifacts/images/';

/* ---------- DATA ---------- */
const MINI = [
  { t:'Counting Claims — Statistical Deep Dive into Dental Reimbursements', tag:'Statistics',
    d:'Confidence intervals (90/95/99%) on dental claim reimbursements in Excel — statistical rigor applied to healthcare finance.',
    img:'st1%20(5).jpg',
    url:'https://github.com/GouthumKharvi/Counting-Claims-A-Statistical-Deep-Dive-into-Dental-Reimbursements' },
  { t:'Statistical Analysis of Factors Influencing House Prices', tag:'Statistics',
    d:'Multiple regression on price/sqft, bathrooms & floor size for high-floor 2BHK homes — tests significance of each factor.',
    img:'house.jpg', url:'https://github.com/GouthumKharvi/-Statistical-Analysis-of-Factors-Influencing-House-Prices' },
  { t:'NFT Market Trends — SQL Analysis of Cryptopunks', tag:'SQL',
    d:'Cryptopunks NFT sales (2018–2021) explored via SQL — top transactions, averages, daily trends & buyer-level insights.',
    img:'nftt.jpg', url:'https://github.com/GouthumKharvi/NFT-Market-Trends-SQL-Analysis-of-Cryptopunks-Transactions' },
  { t:'Healthcare Summary Report', tag:'Tableau',
    d:'Interactive Tableau dashboards on diabetes, blood pressure & BMI from patient health data — story-driven insight.',
    img:'healthcare-sector.jpg', url:'https://github.com/GouthumKharvi/Healthcare-summary-report-Tableu-' },
  { t:'ANN Regression — Salary Prediction', tag:'Deep Learning',
    d:'End-to-end ANN regression (TF/Keras + Streamlit) predicting customer estimated salary with full preprocessing & UI.',
    img:'annsalary.png', url:'https://github.com/GouthumKharvi/ANN-REGRESSION-SALARY-PREDICTION' },
  { t:'ANN Customer Churn Prediction', tag:'Deep Learning',
    d:'Customer churn prediction ANN (TF/Keras + Streamlit) — preprocessing, encoding, scaling & real-time inference.',
    img:'ann%20class.png', url:'https://github.com/GouthumKharvi/ANN-CLASSIFICATION-CUSTOMER-CHURN' },
  { t:'Movie Sentiment Prediction — Simple RNN', tag:'Deep Learning',
    d:'IMDB sentiment classifier with Simple RNN (TF/Keras + Streamlit) — full text pipeline & real-time inference.',
    img:'endtoend.png', url:'https://github.com/GouthumKharvi/End-To_End-DL-Projects-with-Simple-RNN-Movie-Sentiment-Prediction-' },
  { t:'Next-Word Prediction — LSTM & GRU', tag:'DL · NLP',
    d:'Shakespeare Hamlet next-word prediction with LSTM & GRU — tokenization, sequence generation & live UI.',
    img:'nextword.png', url:'https://github.com/GouthumKharvi/Next-Word-Prediction-Using-LSTM-and-GRU' },
];

const PROJECTS = [
  { t:'Career Navigator AI', tag:'Multi-Agent AI', cat:'genai',
    d:'Multi-agent LangChain career assistant — live jobs, skill extraction, salary insight & AI roadmap generation.',
    img:'careernav.png', url:'https://github.com/GouthumKharvi/CompleteAgenticAI/tree/main/6.1%20Career%20Navigator%20Multi%20Agent-AI-System%20using%20Langchain' },
  { t:'ResearchMind AI', tag:'Multi-Agent', cat:'genai',
    d:'Agentic research assistant — live web search, scraping, report generation & AI evaluation in a shared-state workflow.',
    img:'researchmimd.png', url:'https://github.com/GouthumKharvi/CompleteAgenticAI/tree/main/6.%20Multi%20Agent-AI-System%20using%20Langchain' },
  { t:'Agentic AI Travel Planner', tag:'LangChain', cat:'genai',
    d:'ReAct-based travel agent fusing country info, weather, currency & attractions APIs into a full itinerary.',
    img:'agenticaii.png', url:'https://github.com/GouthumKharvi/CompleteAgenticAI/tree/main/5.1%20Agentic-AI-Travel-Planner-Agent' },
  { t:'Single AI Agent System', tag:'Agentic AI', cat:'genai',
    d:'Production-style LangChain ReAct agent — selects tools, hits live APIs & responds intelligently.',
    img:'singlee.png', url:'https://github.com/GouthumKharvi/CompleteAgenticAI/tree/main/5.Single%20AI%20Agent%20system%20using%20Langchain' },
  { t:'EcoSort Vision', tag:'CV · MLOps', cat:'ml',
    d:'YOLO11 waste detection across 10 categories — Flask, Docker, GitHub Actions, AWS & CI/CD for end-to-end MLOps.',
    img:'ecosort.png', url:'https://github.com/GouthumKharvi/EcoSort-Vision-AI-Powered-Waste-Detection-and-Classification-System-using-YOLO11' },
  { t:'Medical Chatbot', tag:'GenAI · RAG', cat:'genai',
    d:'RAG chatbot — LangChain, Pinecone, Groq Llama 3.3, Flask, Docker & AWS — answers from trusted medical knowledge.',
    img:'Medicalbot.png', url:'https://github.com/GouthumKharvi/Medical-Chatbot-GenAI-' },
  { t:'AI Recipe Assistant', tag:'GenAI · CrewAI', cat:'genai',
    d:'Multi-agent RAG recipe assistant — CrewAI + LangChain + Groq with chat, shopping, tracking & voice (soon) in Streamlit.',
    img:'chatbot-restaurant.jpg', url:'https://github.com/GouthumKharvi/AI-Global-Translator' },
  { t:'Salary Prediction', tag:'ML · DL', cat:'ml',
    d:'End-to-end employee salary prediction — EDA, model training, comparison & real-time forecast in Streamlit.',
    img:'salarypreictionimage.jpg', url:'https://github.com/GouthumKharvi/AI-Global-Translator' },
  { t:'AI Global Language Translator', tag:'AI App', cat:'genai',
    d:'Translate text, speech & files across 100+ languages with voice input, TTS output & document upload.',
    img:'aitranslator.jpeg', url:'https://github.com/GouthumKharvi/AI-Global-Translator' },
  { t:'AI-Powered Job Recommendation', tag:'NLP', cat:'nlp',
    d:'Transformer sentence embeddings semantically match resumes to job postings — beyond keyword search.',
    img:'aiparser.png', url:'https://github.com/GouthumKharvi/AI-Resume-Parser' },
  { t:\"TinyTales — Children's Story Generator\", tag:'GenAI', cat:'genai',
    d:\"GPT-2 + Hugging Face Transformers generating age-appropriate children's stories from a simple prompt.\",
    img:'aistory.jpg', url:'https://github.com/GouthumKharvi/TinyTales-GenAI' },
  { t:'Product Defect Detection', tag:'AI · CV', cat:'ml',
    d:'MobileNetV2 / CNN / EfficientNetB0 binary defect classifier with Grad-CAM, email alerts & quality monitoring.',
    img:'aidefect.png', url:'https://github.com/GouthumKharvi/AI-Product-Defect' },
  { t:'Invoice Information Extraction', tag:'Python · ML', cat:'ml',
    d:'Extract invoice number, date & line items from invoice images — scalable key-value model architecture.',
    img:'invoice.jpg', url:'https://github.com/GouthumKharvi/Invoice-Information-Extraction-Using-Python-and-Machine-Learning' },
  { t:'Used Car Price Prediction', tag:'ML', cat:'ml',
    d:'Compares Linear Regression, RF & XGBoost with tuning & CV — RMSE/R² evaluated for fair market value estimation.',
    img:'carprice.jpg', url:'https://github.com/GouthumKharvi/usedcarprediction' },
  { t:'Student Feedback Analyzer', tag:'ML · NLP · Power BI', cat:'nlp',
    d:'TextBlob/VADER sentiment + LR/RF classification on student feedback with Streamlit app & Power BI dashboard.',
    img:'collegeevent.jpeg', url:'https://github.com/GouthumKharvi/FUTURE_DS_03' },
  { t:'Social Media Campaign Tracker', tag:'Power BI', cat:'bi',
    d:'Facebook & Instagram ad performance dashboard — DAX, KPIs, behavior, effectiveness & ROI analysis.',
    img:'social.png', url:'https://github.com/GouthumKharvi/FUTURE_DS_02' },
  { t:'E-commerce Sales Dashboard', tag:'Power BI', cat:'bi',
    d:'Superstore sales 2011–2014 BI dashboard — DAX, forecasts, regions & products with interactive filters.',
    img:'ecom1.jpeg', url:'https://github.com/GouthumKharvi/FUTURE_DS_01' },
  { t:'E-commerce Product Categorization', tag:'ML · DL', cat:'ml',
    d:'NLP + ML/DL (PyTorch) categorizing e-commerce products from descriptions.',
    img:'pc.jpg', url:'https://github.com/GouthumKharvi/Product-Categorization' },
  { t:'Retail Store Allocation Optimization', tag:'OR · PuLP', cat:'ml',
    d:'Linear programming with PuLP/Gurobi — minimize shipping cost across warehouses & stores under supply/demand constraints.',
    img:'retails.jpg', url:'https://github.com/GouthumKharvi/Retail-Store-Allocation-Optimization-using-PuLP' },
  { t:'Credit Card Fraud Detection', tag:'ML', cat:'ml',
    d:'SMOTE balancing + LR/XGBoost/Decision Tree — ROC-AUC 0.99 (train) / 0.97 (test) on imbalanced fraud data.',
    img:'cred.jpg', url:'https://github.com/GouthumKharvi/Credit-Card-Capstone-' },
  { t:'Duplicate Question Detection', tag:'NLP', cat:'nlp',
    d:'BoW + custom features + Random Forest classifier identifying duplicate question pairs — Streamlit on Heroku.',
    img:'NLP%20(1).jpg', url:'https://github.com/GouthumKharvi/Duplicate_Question_Pair-NLP-' },
  { t:'Blinkit Comprehensive Sales Analysis', tag:'Power BI', cat:'bi',
    d:'In-depth Blinkit Power BI analysis — KPIs, customer satisfaction & inventory insight for business improvement.',
    img:'Blinkitt%20(1).png', url:'https://github.com/GouthumKharvi/Comprehensive-Sales-Analysis-of-Blinkit-Using-Power-BI' },
  { t:'Real-Time SLA Monitoring & Alert System', tag:'ML · Data Eng', cat:'ml',
    d:'Real-time SLA breach tracker with email alerts, Streamlit dashboard auto-refresh & local cloud-storage simulation.',
    img:'sla.jpg', url:'https://github.com/GouthumKharvi/Real-Time-SLA-Monitoring-and-Alert-System' },
  { t:'HR Insights & Employee Data Dashboard', tag:'Tableau', cat:'bi',
    d:'HR workforce Tableau dashboard — demographics, hires/terminations, salary variation & deep employee filters.',
    img:'hrimage.jpg', url:'https://github.com/GouthumKharvi/HR-Insights-and-Employee-Data-Dashboard?tab=readme-ov-file#hr-insights-and-employee-data-dashboard' },
  { t:'Car Sales Database Management System', tag:'SQL', cat:'sql',
    d:'GlobalCarDetails SQL schema — manufacturers, models, regional sales & pricing trends with sample datasets.',
    img:'carrsales.jpeg', url:'https://github.com/GouthumKharvi/Car-Sales-Database-Management-System-using-SQL' },
  { t:\"Virat Kohli's T20 Performance Analysis (2010–2024)\", tag:'Excel', cat:'bi',
    d:\"Excel-driven analysis of Virat Kohli's 14-year T20 career — trends, matchups & visual storytelling.\",
    img:'vk2.jpeg', url:'https://github.com/GouthumKharvi/ViratKohli_T20_Stats_2010-2024' },
];

const CERTS = [
  { t:'Data Science Bootcamp',                     issuer:'upGrad · Aug 2024',     img:'upgrad_certificate.jpg' },
  { t:'AI for All — From Basics to GenAI Practice', issuer:'NVIDIA · Jul 2025',    img:'nvidia_certificate.jpg' },
  { t:'GenAI Powered Data Analytics Job Simulation',issuer:'TATA · Forage · Aug 2025', img:'tata_certificate.jpg' },
  { t:'Data Science & Analytics Internship',       issuer:'Future Interns · Jul 2025', img:'future_interns_certificate.jpg' },
  { t:'Data Science Internship · LOR',             issuer:'Future Interns · Jul 2025', img:'future_interns_certificate-lor.jpg' },
  { t:'AI & Machine Learning Internship',          issuer:'Pinnacle Labs · Aug 2025',  img:'pinnacle_certificates.jpg' },
  { t:'AI & Machine Learning Internship',          issuer:'InLighnX Global · Aug 2025',img:'inlighn.jpg' },
];

/* ---------- INJECT CARDS ---------- */
const card = (p, i) => `
  <article class=\"card reveal\" data-cat=\"${p.cat||''}\">
    <div class=\"card-media\">
      <span class=\"card-tag\">${p.tag}</span>
      <img loading=\"lazy\" src=\"${IMG}${p.img}\" alt=\"${p.t}\" />
    </div>
    <div class=\"card-body\">
      <h3 class=\"card-title\">${p.t}</h3>
      <p class=\"card-desc\">${p.d}</p>
      <div class=\"card-foot\">
        <span class=\"card-num\">${String(i+1).padStart(2,'0')} / ${String(p.total).padStart(2,'0')}</span>
        <a href=\"${p.url}\" target=\"_blank\" rel=\"noopener\" data-testid=\"card-link-${i}\">View on GitHub <i class=\"fas fa-arrow-up-right-from-square\"></i></a>
      </div>
    </div>
  </article>`;

const miniGrid = document.getElementById('miniGrid');
miniGrid.innerHTML = MINI.map((p,i)=>card({...p, total: MINI.length}, i)).join('');

const projGrid = document.getElementById('projGrid');
projGrid.innerHTML = PROJECTS.map((p,i)=>card({...p, total: PROJECTS.length}, i)).join('');

const certGrid = document.getElementById('certGrid');
certGrid.innerHTML = CERTS.map((c,i)=>`
  <article class=\"cert reveal\" data-img=\"${IMG}${c.img}\" data-testid=\"cert-${i}\">
    <img loading=\"lazy\" src=\"${IMG}${c.img}\" alt=\"${c.t}\" />
    <div class=\"cert-info\">
      <div>
        <h4>${c.t}</h4>
        <p>${c.issuer}</p>
      </div>
      <span class=\"cert-view\"><i class=\"fas fa-eye\"></i></span>
    </div>
  </article>`).join('');

/* ---------- FILTERS ---------- */
document.querySelectorAll('#filters .chip').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('#filters .chip').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    projGrid.querySelectorAll('.card').forEach(c=>{
      const show = (f === 'all') || (c.dataset.cat === f);
      c.style.display = show ? '' : 'none';
    });
  });
});

/* ---------- CERT MODAL ---------- */
const modal = document.getElementById('certModal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');
certGrid.addEventListener('click', e=>{
  const cert = e.target.closest('.cert'); if(!cert) return;
  modalImg.src = cert.dataset.img;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
});
const closeModal = ()=>{ modal.classList.remove('open'); document.body.style.overflow=''; };
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

/* ---------- TABS ---------- */
document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    const id = tab.dataset.tab;
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(id).classList.add('active');
  });
});

/* ---------- MOBILE MENU ---------- */
const menuBtn = document.getElementById('menuBtn');
const navEl   = document.querySelector('.nav nav');
menuBtn.addEventListener('click', ()=> navEl.classList.toggle('open'));
document.querySelectorAll('#navList a').forEach(a=>a.addEventListener('click',()=>navEl.classList.remove('open')));

/* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
const navLinks = document.querySelectorAll('#navList a');
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href')));
const navObs = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      navLinks.forEach(l=>l.classList.remove('active'));
      const id = '#'+en.target.id;
      const link = document.querySelector(`#navList a[href=\"${id}\"]`);
      if(link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s=> s && navObs.observe(s));

/* ---------- REVEAL ON SCROLL ---------- */
const reveal = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); reveal.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .section, .hero-stats > div, .contact-row, .photo-frame').forEach(el=>{
  el.classList.add('reveal'); reveal.observe(el);
});

/* ---------- PROGRESS BAR ---------- */
const progress = document.getElementById('progress');
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = p + '%';
}, { passive: true });

/* ---------- YEAR ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- TILT ---------- */
if(window.VanillaTilt){
  VanillaTilt.init(document.querySelectorAll('.tilt, .card, .cert'), {
    max: 8, speed: 600, glare: true, 'max-glare': 0.15, scale: 1.02, perspective: 1200
  });
}

/* ---------- CUSTOM CURSOR ---------- */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx=0, my=0, rx=0, ry=0;
window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; dot.style.transform=`translate(${mx-3}px,${my-3}px)`; });
function follow(){ rx += (mx-rx)*0.18; ry += (my-ry)*0.18; ring.style.transform=`translate(${rx-18}px,${ry-18}px)`; requestAnimationFrame(follow); }
follow();
document.querySelectorAll('a,button,.card,.cert,.tab,.chip,input,textarea').forEach(el=>{
  el.addEventListener('mouseenter', ()=>ring.classList.add('hover'));
  el.addEventListener('mouseleave', ()=>ring.classList.remove('hover'));
});

/* ---------- CONTACT FORM (Web3Forms) ---------- */
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const key = form.querySelector('[name=\"access_key\"]').value;
  if(!key || key === 'YOUR_ACCESS_KEY_HERE'){
    formMsg.textContent = 'Form not configured — set your Web3Forms access key in index.html.';
    formMsg.className = 'form-msg err';
    return;
  }
  formMsg.textContent = 'Sending…'; formMsg.className = 'form-msg';
  const data = new FormData(form);
  try{
    const res = await fetch('https://api.web3forms.com/submit', { method:'POST', body:data });
    const json = await res.json();
    if(json.success){ formMsg.textContent = '✓ Message sent — I will get back within 24h.'; formMsg.className='form-msg ok'; form.reset(); }
    else { formMsg.textContent = json.message || 'Something went wrong.'; formMsg.className='form-msg err'; }
  }catch(err){
    formMsg.textContent = 'Network error — try again.'; formMsg.className='form-msg err';
  }
});

/* ============================================================
 *  THREE.JS — 3D BACKDROP (particles + floating wireframes)
 * ============================================================ */
const canvas = document.getElementById('bg3d');
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

// Particle field
const PCOUNT = 1400;
const pGeom = new THREE.BufferGeometry();
const positions = new Float32Array(PCOUNT * 3);
const colors    = new Float32Array(PCOUNT * 3);
const palette = [
  new THREE.Color('#ff2d75'),
  new THREE.Color('#00e5ff'),
  new THREE.Color('#8b5cf6'),
  new THREE.Color('#ffffff'),
];
for(let i=0;i<PCOUNT;i++){
  positions[i*3+0] = (Math.random()-0.5) * 24;
  positions[i*3+1] = (Math.random()-0.5) * 18;
  positions[i*3+2] = (Math.random()-0.5) * 18 - 4;
  const c = palette[Math.floor(Math.random()*palette.length)];
  colors[i*3+0] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
}
pGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
pGeom.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
const pMat = new THREE.PointsMaterial({
  size: 0.035, vertexColors: true, transparent: true, opacity: 0.85,
  depthWrite: false, blending: THREE.AdditiveBlending,
});
const points = new THREE.Points(pGeom, pMat);
scene.add(points);

// Floating wireframe shapes
function shape(geo, color, pos){
  const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, wireframe:true, transparent:true, opacity:0.45 }));
  m.position.set(...pos);
  scene.add(m);
  return m;
}
const ico  = shape(new THREE.IcosahedronGeometry(1.4, 1),  0xff2d75, [ 4.2,  1.6, -3]);
const tors = shape(new THREE.TorusKnotGeometry(0.8, 0.22, 100, 16), 0x00e5ff, [-4.8, -1.2, -2]);
const oct  = shape(new THREE.OctahedronGeometry(0.9, 0),   0x8b5cf6, [ 3.2, -2.8, -4]);
const dodec= shape(new THREE.DodecahedronGeometry(0.9, 0), 0xffd166, [-3.6,  2.6, -5]);

// Lights aren't needed for basic materials, but add an ambient for any future swaps
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// Mouse parallax
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (e)=>{
  mouse.x = (e.clientX / window.innerWidth)  * 2 - 1;
  mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
});

// Scroll-based camera dolly
let scrollY = 0;
window.addEventListener('scroll', ()=> scrollY = window.scrollY, { passive:true });

const clock = new THREE.Clock();
function animate(){
  const t = clock.getElapsedTime();

  points.rotation.y = t * 0.04;
  points.rotation.x = Math.sin(t * 0.2) * 0.05;

  ico.rotation.x   = t * 0.25; ico.rotation.y   = t * 0.32;
  tors.rotation.x  = t * 0.18; tors.rotation.y  = -t * 0.22;
  oct.rotation.x   = -t * 0.28; oct.rotation.z  = t * 0.20;
  dodec.rotation.y = t * 0.16;  dodec.rotation.z = -t * 0.18;

  // float
  ico.position.y   = 1.6 + Math.sin(t*0.8)*0.4;
  tors.position.y  = -1.2 + Math.cos(t*0.7)*0.35;
  oct.position.y   = -2.8 + Math.sin(t*0.6)*0.4;
  dodec.position.y = 2.6 + Math.cos(t*0.9)*0.35;

  // camera react
  camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.04;
  camera.position.y += (-mouse.y * 0.5 - camera.position.y + scrollY*0.0015) * 0.04;
  camera.position.z = 6 - Math.min(scrollY*0.001, 2);
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
"
Observation: Create successful: /app/static_portfolio/script.js
