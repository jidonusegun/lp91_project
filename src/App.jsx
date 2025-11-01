import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectInfo from './components/ProjectInfo';
import BuildingDesign from './components/BuildingDesign';
import Support from './components/Support';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <ProjectInfo />
      <BuildingDesign />
      <Support />
      <Footer />
    </div>
  );
}

export default App;
