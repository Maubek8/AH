// main.js – Interações da página Eixo Vital

document.addEventListener('DOMContentLoaded', function() {
  // Gráfico de Pizza Interativo
  const initPieChart = () => {
    const ctx = document.getElementById('supplementPieChart');
    if (!ctx) return;
    
    const supplementInfo = {
      'Cérebro/Humor': ['Ômega-3 (EPA/DHA)', 'NAC', 'Complexo B ativo'],
      'Cognição/Energia': ['Creatina', 'Vitamina B12', 'Magnésio'],
      'Lubrificação/Libido': ['Testosterona', 'Ômega-3 (EPA/DHA)', 'Zinco'],
      'Sono/Relaxamento': ['Magnésio', 'Progesterona', 'Melatonina (se necessário)'],
      'Hormonal': ['Estradiol', 'Progesterona', 'Testosterona', 'Vitamina D'],
      'Imunidade/Detox': ['Zinco', 'Selênio', 'NAC', 'Vitamina D']
    };

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(supplementInfo),
        datasets: [{
          label: 'Atuação dos Suplementos',
          data: [15, 20, 15, 10, 25, 15],
          backgroundColor: [
            '#f5c400',  // Amarelo neon
            '#03a9f4',  // Azul neon
            '#ff9800',  // Laranja
            '#4caf50',  // Verde
            '#9c27b0',  // Roxo
            '#e91e63'   // Rosa
          ],
          borderWidth: 1,
          borderColor: '#333'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#e0e0e0',
              font: {
                size: 14
              },
              padding: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.formattedValue || '';
                const supplements = supplementInfo[context.label].join(', ');
                return `${label}: ${value}% (${supplements})`;
              }
            },
            bodyFont: {
              size: 14
            },
            titleFont: {
              size: 16
            }
          }
        },
        onClick: (evt, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const category = Object.keys(supplementInfo)[index];
            const infoDiv = document.getElementById('supplementInfo');
            
            let html = `<div class="supplement-tooltip">
              <h3>${category}</h3>
              <ul>`;
            
            supplementInfo[category].forEach(sup => {
              html += `<li>${sup}</li>`;
            });
            
            html += `</ul></div>`;
            
            infoDiv.innerHTML = html;
            infoDiv.style.display = 'block';
            
            // Esconde após 5 segundos
            setTimeout(() => {
              infoDiv.style.display = 'none';
            }, 5000);
          }
        }
      }
    });
  };

  // Ativação do Eixo HHO com cores neon
  const initHHOInteraction = () => {
    const trhButton = document.getElementById('trhActivate');
    const hhoDefault = document.getElementById('hhoDefault');
    const hhoAfter = document.getElementById('hhoAfter');

    if (!trhButton || !hhoDefault || !hhoAfter) return;

    trhButton.addEventListener('click', () => {
      hhoDefault.style.display = 'none';
      hhoAfter.style.display = 'block';
      
      hhoAfter.innerHTML = `
        <div style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#f5c400; font-size:1.2rem;">
          <div style="margin-bottom:1rem;">Eixo HHO reativado com TRH</div>
          <div style="display:flex; align-items:center; justify-content:center; width:100%;">
            <div style="text-align:center; padding:0 1rem;">
              <div style="font-weight:bold; color:#03a9f4;">Hipotálamo</div>
              <div>↓</div>
            </div>
            <div style="text-align:center; padding:0 1rem;">
              <div style="font-weight:bold; color:#9c27b0;">Hipófise</div>
              <div>↓</div>
            </div>
            <div style="text-align:center; padding:0 1rem;">
              <div style="font-weight:bold; color:#4caf50;">Ovários</div>
            </div>
          </div>
          <div style="margin-top:1rem; font-size:1rem; color:#fff;">Fluxo hormonal restaurado!</div>
        </div>
      `;
      
      hhoAfter.style.background = 'linear-gradient(90deg, #111, #222, #1a1a1a)';
      hhoAfter.style.boxShadow = '0 0 30px rgba(245, 196, 0, 0.3) inset';
      hhoAfter.style.border = '1px solid rgba(245, 196, 0, 0.5)';
      hhoAfter.style.animation = 'pulse 2s infinite alternate';
      
      // Animação de confetes
      setTimeout(() => {
        const confettiCount = 30;
        for (let i = 0; i < confettiCount; i++) {
          createConfetti(hhoAfter);
        }
      }, 500);
    });
  };

  // Efeito de confete para feedback visual
  const createConfetti = (container) => {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '8px';
    confetti.style.height = '8px';
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.borderRadius = '50%';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.opacity = '0.8';
    confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
    
    container.appendChild(confetti);
    
    const animationDuration = Math.random() * 3 + 2;
    
    confetti.animate([
      { top: '-10px', opacity: 0 },
      { top: '10%', opacity: 1 },
      { top: '80%', opacity: 0.5 },
      { top: '100%', opacity: 0 }
    ], {
      duration: animationDuration * 1000,
      easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
    });
    
    setTimeout(() => {
      confetti.remove();
    }, animationDuration * 1000);
  };

  const getRandomColor = () => {
    const colors = ['#f5c400', '#03a9f4', '#4caf50', '#9c27b0', '#e91e63', '#ff9800'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Inicializa todos os componentes
  initPieChart();
  initHHOInteraction();

  // Adiciona estilo de animação dinamicamente
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { box-shadow: 0 0 30px rgba(245, 196, 0, 0.3) inset; }
      100% { box-shadow: 0 0 50px rgba(245, 196, 0, 0.5) inset; }
    }
    
    .supplement-tooltip {
      background: rgba(30, 30, 30, 0.95);
      border: 1px solid #f5c400;
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1rem;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
    }
    
    .supplement-tooltip h3 {
      color: #f5c400;
      margin-top: 0;
      border-bottom: 1px solid #444;
      padding-bottom: 0.5rem;
    }
    
    .supplement-tooltip ul {
      margin: 0.5rem 0 0 1rem;
      padding-left: 0;
    }
    
    .supplement-tooltip li {
      margin-bottom: 0.3rem;
    }
  `;
  document.head.appendChild(style);
});
