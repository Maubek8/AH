// main.js - Script completo para a página Eixo Vital

document.addEventListener('DOMContentLoaded', function() {
  // ==================== GRÁFICO DE SUPLEMENTOS ====================
  const initSupplementChart = () => {
    const chartContainer = document.querySelector('.chart-container');
    const tooltip = document.getElementById('pieTooltip');
    
    if (!chartContainer || !tooltip) return;

    // Dados dos setores do gráfico
    const sectors = [
      { 
        name: "Cérebro e Humor", 
        supplements: ["Ômega-3 (EPA/DHA)", "NAC", "Complexo B ativo"],
        color: "#f5c400",
        startAngle: 0,
        endAngle: 0.2 * Math.PI
      },
      {
        name: "Cognição e Energia",
        supplements: ["Creatina", "Vitamina B12", "Magnésio"],
        color: "#03a9f4",
        startAngle: 0.2 * Math.PI,
        endAngle: 0.5 * Math.PI
      },
      {
        name: "Lubrificação e Libido",
        supplements: ["Testosterona", "Ômega-3 (EPA/DHA)", "Zinco"],
        color: "#ff9800",
        startAngle: 0.5 * Math.PI,
        endAngle: 0.8 * Math.PI
      },
      {
        name: "Sono e Relaxamento",
        supplements: ["Magnésio", "Progesterona", "Melatonina (se necessário)"],
        color: "#4caf50",
        startAngle: 0.8 * Math.PI,
        endAngle: 1.1 * Math.PI
      },
      {
        name: "Sistema Hormonal",
        supplements: ["Estradiol", "Progesterona", "Testosterona", "Vitamina D"],
        color: "#9c27b0",
        startAngle: 1.1 * Math.PI,
        endAngle: 1.7 * Math.PI
      },
      {
        name: "Imunidade e Detox",
        supplements: ["Zinco", "Selênio", "NAC", "Vitamina D"],
        color: "#e91e63",
        startAngle: 1.7 * Math.PI,
        endAngle: 2 * Math.PI
      }
    ];

    // Cria o gráfico como SVG dinâmico
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 400 400");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    
    const centerX = 200;
    const centerY = 200;
    const radius = 180;
    
    // Desenha cada setor do gráfico
    sectors.forEach(sector => {
      const path = document.createElementNS(svgNS, "path");
      
      const x1 = centerX + radius * Math.cos(sector.startAngle);
      const y1 = centerY + radius * Math.sin(sector.startAngle);
      const x2 = centerX + radius * Math.cos(sector.endAngle);
      const y2 = centerY + radius * Math.sin(sector.endAngle);
      
      const largeArcFlag = sector.endAngle - sector.startAngle <= Math.PI ? "0" : "1";
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        "Z"
      ].join(" ");
      
      path.setAttribute("d", pathData);
      path.setAttribute("fill", sector.color);
      path.setAttribute("stroke", "#0b0c10");
      path.setAttribute("stroke-width", "2");
      path.setAttribute("data-name", sector.name);
      path.setAttribute("data-supplements", sector.supplements.join(", "));
      
      path.addEventListener("mouseenter", (e) => {
        const rect = chartContainer.getBoundingClientRect();
        tooltip.innerHTML = `<strong>${sector.name}</strong><br>${sector.supplements.join(", ")}`;
        tooltip.style.display = "block";
        tooltip.style.left = `${e.clientX - rect.left + 15}px`;
        tooltip.style.top = `${e.clientY - rect.top + 15}px`;
      });
      
      path.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });
      
      svg.appendChild(path);
    });
    
    // Adiciona título central
    const title = document.createElementNS(svgNS, "text");
    title.setAttribute("x", centerX);
    title.setAttribute("y", centerY);
    title.setAttribute("text-anchor", "middle");
    title.setAttribute("dominant-baseline", "middle");
    title.setAttribute("fill", "#ffffff");
    title.setAttribute("font-size", "20");
    title.textContent = "Suplementos";
    svg.appendChild(title);
    
    // Substitui a imagem estática pelo SVG dinâmico
    const chartImg = document.querySelector('.chart-img');
    if (chartImg) {
      chartContainer.insertBefore(svg, chartImg);
      chartImg.remove();
    }
  };

  // ==================== EIXO HHO DINÂMICO ====================
  const initHHOAxis = () => {
    const trhButton = document.getElementById('trhActivate');
    const hhoDefault = document.getElementById('hhoDefault');
    const hhoAfter = document.getElementById('hhoAfter');
    
    if (!trhButton || !hhoDefault || !hhoAfter) return;
    
    // Cria o SVG do eixo HHO inativo
    const svgNS = "http://www.w3.org/2000/svg";
    const svgInactive = document.createElementNS(svgNS, "svg");
    svgInactive.setAttribute("viewBox", "0 0 800 200");
    svgInactive.setAttribute("width", "100%");
    svgInactive.setAttribute("height", "100%");
    
    // Desenha o eixo inativo
    const drawOrgan = (x, y, name, color) => {
      const group = document.createElementNS(svgNS, "g");
      
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", "50");
      circle.setAttribute("fill", color);
      circle.setAttribute("opacity", "0.2");
      circle.setAttribute("stroke", color);
      circle.setAttribute("stroke-width", "2");
      group.appendChild(circle);
      
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", x);
      text.setAttribute("y", y + 80);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", color);
      text.setAttribute("font-size", "16");
      text.textContent = name;
      group.appendChild(text);
      
      return group;
    };
    
    svgInactive.appendChild(drawOrgan(150, 100, "Hipotálamo", "#03a9f4"));
    svgInactive.appendChild(drawOrgan(400, 100, "Hipófise", "#9c27b0"));
    svgInactive.appendChild(drawOrgan(650, 100, "Ovários", "#4caf50"));
    
    // Adiciona setas desconectadas
    const drawArrow = (x1, y1, x2, y2, color) => {
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke", color);
      line.setAttribute("stroke-width", "2");
      line.setAttribute("stroke-dasharray", "5,5");
      return line;
    };
    
    svgInactive.appendChild(drawArrow(200, 100, 350, 100, "#888"));
    svgInactive.appendChild(drawArrow(450, 100, 600, 100, "#888"));
    
    hhoDefault.appendChild(svgInactive);
    
    // Cria o SVG do eixo HHO ativo
    const svgActive = document.createElementNS(svgNS, "svg");
    svgActive.setAttribute("viewBox", "0 0 800 200");
    svgActive.setAttribute("width", "100%");
    svgActive.setAttribute("height", "100%");
    svgActive.style.display = "none";
    
    // Desenha o eixo ativo com animação
    const drawActiveOrgan = (x, y, name, color) => {
      const group = document.createElementNS(svgNS, "g");
      
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", "50");
      circle.setAttribute("fill", color);
      circle.setAttribute("opacity", "0.6");
      circle.setAttribute("stroke", color);
      circle.setAttribute("stroke-width", "3");
      circle.setAttribute("filter", `url(#glow)`);
      group.appendChild(circle);
      
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", x);
      text.setAttribute("y", y + 80);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#ffffff");
      text.setAttribute("font-size", "16");
      text.setAttribute("font-weight", "bold");
      text.textContent = name;
      group.appendChild(text);
      
      return group;
    };
    
    // Filtro de efeito neon
    const filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", "glow");
    filter.setAttribute("x", "-30%");
    filter.setAttribute("y", "-30%");
    filter.setAttribute("width", "160%");
    filter.setAttribute("height", "160%");
    
    const feGaussianBlur = document.createElementNS(svgNS, "feGaussianBlur");
    feGaussianBlur.setAttribute("stdDeviation", "3");
    feGaussianBlur.setAttribute("result", "blur");
    
    const feComposite = document.createElementNS(svgNS, "feComposite");
    feComposite.setAttribute("in", "SourceGraphic");
    feComposite.setAttribute("in2", "blur");
    feComposite.setAttribute("operator", "over");
    
    filter.appendChild(feGaussianBlur);
    filter.appendChild(feComposite);
    svgActive.appendChild(filter);
    
    svgActive.appendChild(drawActiveOrgan(150, 100, "Hipotálamo", "#03a9f4"));
    svgActive.appendChild(drawActiveOrgan(400, 100, "Hipófise", "#9c27b0"));
    svgActive.appendChild(drawActiveOrgan(650, 100, "Ovários", "#4caf50"));
    
    // Adiciona setas conectadas com animação
    const drawActiveArrow = (x1, y1, x2, y2, color) => {
      const group = document.createElementNS(svgNS, "g");
      
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke", color);
      line.setAttribute("stroke-width", "3");
      line.setAttribute("marker-end", "url(#arrowhead)");
      group.appendChild(line);
      
      // Animação de fluxo
      const animate = document.createElementNS(svgNS, "animate");
      animate.setAttribute("attributeName", "stroke-dashoffset");
      animate.setAttribute("from", "100");
      animate.setAttribute("to", "0");
      animate.setAttribute("dur", "2s");
      animate.setAttribute("repeatCount", "indefinite");
      line.appendChild(animate);
      
      return group;
    };
    
    // Cria marcador de seta
    const defs = document.createElementNS(svgNS, "defs");
    const marker = document.createElementNS(svgNS, "marker");
    marker.setAttribute("id", "arrowhead");
    marker.setAttribute("markerWidth", "10");
    marker.setAttribute("markerHeight", "7");
    marker.setAttribute("refX", "9");
    marker.setAttribute("refY", "3.5");
    marker.setAttribute("orient", "auto");
    
    const polygon = document.createElementNS(svgNS, "polygon");
    polygon.setAttribute("points", "0 0, 10 3.5, 0 7");
    polygon.setAttribute("fill", "#f5c400");
    
    marker.appendChild(polygon);
    defs.appendChild(marker);
    svgActive.appendChild(defs);
    
    svgActive.appendChild(drawActiveArrow(200, 100, 350, 100, "#f5c400"));
    svgActive.appendChild(drawActiveArrow(450, 100, 600, 100, "#f5c400"));
    
    hhoAfter.appendChild(svgActive);
    
    // Botão de ativação
    trhButton.addEventListener('click', () => {
      hhoDefault.style.display = 'none';
      svgActive.style.display = 'block';
      
      // Efeito de confete
      createConfettiEffect(hhoAfter);
    });
  };

  // ==================== EFEITO DE CONFETE ====================
  const createConfettiEffect = (container) => {
    const colors = ['#f5c400', '#03a9f4', '#4caf50', '#9c27b0', '#e91e63'];
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        
        container.appendChild(confetti);
        
        // Remove após animação
        setTimeout(() => {
          confetti.remove();
        }, 3000);
      }, i * 50);
    }
  };

  // ==================== INICIALIZAÇÃO ====================
  initSupplementChart();
  initHHOAxis();
  
  // Adiciona estilo dinâmico para confetti
  const style = document.createElement('style');
  style.textContent = `
    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      opacity: 0.8;
      animation: confetti-fall linear forwards;
    }
    
    @keyframes confetti-fall {
      0% {
        transform: translateY(-100px) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100px) rotate(360deg);
        opacity: 0;
      }
    }
    
    #pieTooltip {
      position: absolute;
      background: rgba(15, 15, 15, 0.95);
      border: 1px solid #f5c400;
      border-radius: 8px;
      padding: 10px 15px;
      color: white;
      pointer-events: none;
      z-index: 100;
      max-width: 200px;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
      display: none;
    }
    
    #pieTooltip strong {
      color: #f5c400;
      display: block;
      margin-bottom: 5px;
    }
  `;
  document.head.appendChild(style);
});
