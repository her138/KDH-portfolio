@echo off
echo Fixing all issues...

echo 1. Fixing Projects.jsx Flock error...
powershell -Command "(Get-Content 'src/components/Projects.jsx') -replace 'Flock', 'FaLock' | Set-Content 'src/components/Projects.jsx'"

echo 2. Fixing HUDDisplay defaultProps...
(
echo import React from 'react';
echo.
echo const HUDDisplay = ({ stats = [
echo   { label: 'System', value: 'ONLINE', progress: 100 },
echo   { label: 'Projects', value: '24', progress: 80 },
echo   { label: 'Clients', value: '48', progress: 60 },
echo   { label: 'Uptime', value: '99.9%', progress: 99 },
echo ] }) => {
echo   return (
echo     <div className="hud-display font-mono">
echo       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
echo         {stats.map((stat, index) => (
echo           <div key={index} className="text-center">
echo             <div className="text-cyber-blue text-sm uppercase tracking-wider mb-1">
echo               {stat.label}
echo             </div>
echo             <div className="text-matrix-green text-2xl font-bold">
echo               {stat.value}
echo             </div>
echo             <div className="h-1 bg-terminal-gray mt-2 overflow-hidden">
echo               <div 
echo                 className="h-full bg-matrix-green transition-all duration-1000"
echo                 style={{ width: \`\${stat.progress || 0}%\` }}
echo               ></div>
echo             </div>
echo           </div>
echo         ))}
echo       </div>
echo       
echo       {/* Grid lines */}
echo       <div className="absolute inset-0 grid-bg pointer-events-none"></div>
echo     </div>
echo   );
echo };
echo.
echo export default HUDDisplay;
) > src/components/hacker/HUDDisplay.jsx

echo 3. Fixing App.jsx router warnings...
(
echo import React from 'react';
echo import { BrowserRouter as Router } from 'react-router-dom';
echo import Header from './components/Header';
echo import Hero from './components/Hero';
echo import About from './components/About';
echo import Projects from './components/Projects';
echo import Reviews from './components/Reviews';
echo import Contact from './components/Contact';
echo import Footer from './components/Footer';
echo.
echo function App() {
echo   return (
echo     <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
echo       <div className="min-h-screen bg-terminal-black">
echo         <Header />
echo         <main>
echo           <Hero />
echo           <About />
echo           <Projects />
echo           <Reviews />
echo           <Contact />
echo         </main>
echo         <Footer />
echo       </div>
echo     </Router>
echo   );
echo }
echo.
echo export default App;
) > src/App.jsx

echo 4. Fixing file name case sensitivity...
if exist "src/components/REviews.jsx" (
    rename "src/components/REviews.jsx" "Reviews.jsx"
)

echo.
echo ✅ All errors fixed!
echo.
echo Now start both servers:
echo.
echo Terminal 1 (Backend):
echo cd server
echo npm run dev
echo.
echo Terminal 2 (Frontend):
echo npm run dev
echo.
pause