// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import colors from 'vuetify/lib/util/colors'
import VueI18n from 'vue-i18n'

Vue.use(Vuetify)
Vue.use(VueI18n)

const messages = {
  en: {
    $vuetify: {
      examplesButton: 'Examples',
      sidebar: {
        titleIntroduction: {
          value: 'Introduction'
        },
        title1: {
          value: 'Initial Project Phase',
          children: {
            title1: {
              value: 'Summary'
            },
            title2: {
              value: 'Pending Issues'
            },
            title3: {
              value: 'Task Generation'
            },
            title4: {
              value: 'Project Proposal'
            },
            title5: {
              value: 'Project Requirements'
            }
          }
        },
        title2: {
          value: 'Hardware PCB Design Phase',
          children: {
            title1: {
              value: 'HW Design'
            },
            title2: {
              value: 'BOM Management'
            },
            title3: {
              value: 'HW Design Description'
            }
          }
        },
        title3: {
          value: 'Product Validation and Verification Phase',
          children: {
            title1: {
              value: 'VTP - QATP Documentation - ..'
            },
            title2: {
              value: 'Test Automation'
            }
          }
        },
        title4: {
          value: 'FW Design',
          children: {
            title1: {
              value: 'STM32 No Code'
            },
            title2: {
              value: 'STM32 with DL Model'
            }
          }
        },
        title5: {
          value: 'Document Management',
          children: {
            title1: {
              value: 'Document Management'
            }
          }
        },
        title6: {
          value: 'Company Management',
          children: {
            title1: {
              value: 'Company Management'
            },
            title2: {
              value: 'Personnel Management'
            },
            title3: {
              value: 'Incident/Query Management - Email'
            },
            title4: {
              value: 'Incident/Query Management - WhatsApp'
            },
            title5: {
              value: 'Incident/Query Management - Call'
            }
          }
        },
        title7: {
          value: 'Database Query',
          children: {
            title1: {
              value: 'NoSQL Database'
            }
          }
        },
        title8: {
          value: 'Web Services',
          children: {
            title1: {
              value: 'AWS Automation'
            }
          }
        }
      }
    }
  },
  it: {
    $vuetify: {
      examplesButton: 'Esempi',
      sidebar: {
        titleIntroduction: {
          value: 'Introduzione'
        },
        title1: {
          value: 'Fase Iniziale del Progetto',
          children: {
            title1: {
              value: 'Sommario'
            },
            title2: {
              value: 'Problemi Pendenti'
            },
            title3: {
              value: 'Generazione Compiti'
            },
            title4: {
              value: 'Proposta del Progetto'
            },
            title5: {
              value: 'Requisiti del Progetto'
            }
          }
        },
        title2: {
          value: 'Fase di Progettazione Hardware PCB',
          children: {
            title1: {
              value: 'Progettazione HW'
            },
            title2: {
              value: 'Gestione BOM'
            },
            title3: {
              value: 'Descrizione Progettazione HW'
            }
          }
        },
        title3: {
          value: 'Fase di Validazione e Verifica del Prodotto',
          children: {
            title1: {
              value: 'Documentazione VTP - QATP - ..'
            },
            title2: {
              value: 'Automazione Test'
            }
          }
        },
        title4: {
          value: 'Progettazione FW',
          children: {
            title1: {
              value: 'STM32 No Code'
            },
            title2: {
              value: 'STM32 con Modello DL'
            }
          }
        },
        title5: {
          value: 'Gestione Documentale',
          children: {
            title1: {
              value: 'Gestione Documentale'
            }
          }
        },
        title6: {
          value: 'Gestione Aziendale',
          children: {
            title1: {
              value: 'Gestione Aziendale'
            },
            title2: {
              value: 'Gestione Personale'
            },
            title3: {
              value: 'Gestione Incidenti/Consulenze - Email'
            },
            title4: {
              value: 'Gestione Incidenti/Consulenze - WhatsApp'
            },
            title5: {
              value: 'Gestione Incidenti/Consulenze - Chiamata'
            }
          }
        },
        title7: {
          value: 'Consultazione Database',
          children: {
            title1: {
              value: 'Database NoSQL'
            }
          }
        },
        title8: {
          value: 'Servizi Web',
          children: {
            title1: {
              value: 'Automazione AWS'
            }
          }
        }
      }
    }
  },
  de: {
    $vuetify: {
      examplesButton: 'Beispiele',
      sidebar: {
        titleIntroduction: {
          value: 'Einführung'
        },
        title1: {
          value: 'Anfangsphase des Projekts',
          children: {
            title1: {
              value: 'Zusammenfassung'
            },
            title2: {
              value: 'Offene Punkte'
            },
            title3: {
              value: 'Aufgabenerstellung'
            },
            title4: {
              value: 'Projektvorschlag'
            },
            title5: {
              value: 'Projektanforderungen'
            }
          }
        },
        title2: {
          value: 'Hardware PCB Designphase',
          children: {
            title1: {
              value: 'HW-Design'
            },
            title2: {
              value: 'BOM-Management'
            },
            title3: {
              value: 'HW-Designbeschreibung'
            }
          }
        },
        title3: {
          value: 'Produktvalidierungs- und Verifizierungsphase',
          children: {
            title1: {
              value: 'VTP - QATP Dokumentation - ..'
            },
            title2: {
              value: 'Testautomatisierung'
            }
          }
        },
        title4: {
          value: 'FW-Design',
          children: {
            title1: {
              value: 'STM32 No Code'
            },
            title2: {
              value: 'STM32 mit DL-Modell'
            }
          }
        },
        title5: {
          value: 'Dokumentenmanagement',
          children: {
            title1: {
              value: 'Dokumentenmanagement'
            }
          }
        },
        title6: {
          value: 'Unternehmensmanagement',
          children: {
            title1: {
              value: 'Unternehmensmanagement'
            },
            title2: {
              value: 'Personalmanagement'
            },
            title3: {
              value: 'Vorfall-/Anfragenmanagement - E-Mail'
            },
            title4: {
              value: 'Vorfall-/Anfragenmanagement - WhatsApp'
            },
            title5: {
              value: 'Vorfall-/Anfragenmanagement - Anruf'
            }
          }
        },
        title7: {
          value: 'Datenbankabfrage',
          children: {
            title1: {
              value: 'NoSQL-Datenbank'
            }
          }
        },
        title8: {
          value: 'Webdienste',
          children: {
            title1: {
              value: 'AWS-Automatisierung'
            }
          }
        }
      }
    }
  },
  fr: {
    $vuetify: {
      examplesButton: 'Exemples',
      sidebar: {
        titleIntroduction: {
          value: 'Introduction'
        },
        title1: {
          value: 'Phase Initiale du Projet',
          children: {
            title1: {
              value: 'Résumé'
            },
            title2: {
              value: 'Points en Attente'
            },
            title3: {
              value: 'Génération de Tâches'
            },
            title4: {
              value: 'Proposition de Projet'
            },
            title5: {
              value: 'Exigences du Projet'
            }
          }
        },
        title2: {
          value: 'Phase de Conception Matérielle PCB',
          children: {
            title1: {
              value: 'Conception HW'
            },
            title2: {
              value: 'Gestion BOM'
            },
            title3: {
              value: 'Description de la Conception HW'
            }
          }
        },
        title3: {
          value: 'Phase de Validation et Vérification du Produit',
          children: {
            title1: {
              value: 'Documentation VTP - QATP - ..'
            },
            title2: {
              value: 'Automatisation des Tests'
            }
          }
        },
        title4: {
          value: 'Conception FW',
          children: {
            title1: {
              value: 'STM32 No Code'
            },
            title2: {
              value: 'STM32 avec Modèle DL'
            }
          }
        },
        title5: {
          value: 'Gestion Documentaire',
          children: {
            title1: {
              value: 'Gestion Documentaire'
            }
          }
        },
        title6: {
          value: 'Gestion de l’Entreprise',
          children: {
            title1: {
              value: 'Gestion de l’Entreprise'
            },
            title2: {
              value: 'Gestion du Personnel'
            },
            title3: {
              value: 'Gestion des Incidents/Consultations - Email'
            },
            title4: {
              value: 'Gestion des Incidents/Consultations - WhatsApp'
            },
            title5: {
              value: 'Gestion des Incidents/Consultations - Appel'
            }
          }
        },
        title7: {
          value: 'Consultation BDD',
          children: {
            title1: {
              value: 'BDD NoSQL'
            }
          }
        },
        title8: {
          value: 'Services Web',
          children: {
            title1: {
              value: 'Automatisation AWS'
            }
          }
        }
      }
    }
  },
  pt: {
    $vuetify: {
      examplesButton: 'Exemplos',
      sidebar: {
        titleIntroduction: {
          value: 'Introdução'
        },
        title1: {
          value: 'Fase Inicial do Projeto',
          children: {
            title1: {
              value: 'Resumo'
            },
            title2: {
              value: 'Pontos Pendentes'
            },
            title3: {
              value: 'Geração de Tarefas'
            },
            title4: {
              value: 'Proposta do Projeto'
            },
            title5: {
              value: 'Requisitos do Projeto'
            }
          }
        },
        title2: {
          value: 'Fase de Design de Hardware PCB',
          children: {
            title1: {
              value: 'Design de HW'
            },
            title2: {
              value: 'Gestão de BOM'
            },
            title3: {
              value: 'Descrição do Design de HW'
            }
          }
        },
        title3: {
          value: 'Fase de Validação e Verificação do Produto',
          children: {
            title1: {
              value: 'Documentação VTP - QATP - ..'
            },
            title2: {
              value: 'Automação de Testes'
            }
          }
        },
        title4: {
          value: 'Design de FW',
          children: {
            title1: {
              value: 'STM32 No Code'
            },
            title2: {
              value: 'STM32 com Modelo DL'
            }
          }
        },
        title5: {
          value: 'Gestão Documental',
          children: {
            title1: {
              value: 'Gestão Documental'
            }
          }
        },
        title6: {
          value: 'Gestão da Empresa',
          children: {
            title1: {
              value: 'Gestão da Empresa'
            },
            title2: {
              value: 'Gestão de Pessoal'
            },
            title3: {
              value: 'Gestão de Incidentes/Consultas - Email'
            },
            title4: {
              value: 'Gestão de Incidentes/Consultas - WhatsApp'
            },
            title5: {
              value: 'Gestão de Incidentes/Consultas - Chamada'
            }
          }
        },
        title7: {
          value: 'Consulta de Banco de Dados',
          children: {
            title1: {
              value: 'Banco de Dados NoSQL'
            }
          }
        },
        title8: {
          value: 'Serviços Web',
          children: {
            title1: {
              value: 'Automação AWS'
            }
          }
        }
      }
    }
  },
  zh: {
    $vuetify: {
      examplesButton: '示例',
      sidebar: {
        titleIntroduction: {
          value: '介绍'
        },
        title1: {
          value: '项目初始阶段',
          children: {
            title1: {
              value: '概要'
            },
            title2: {
              value: '待处理问题'
            },
            title3: {
              value: '任务生成'
            },
            title4: {
              value: '项目提案'
            },
            title5: {
              value: '项目需求'
            }
          }
        },
        title2: {
          value: '硬件PCB设计阶段',
          children: {
            title1: {
              value: '硬件设计'
            },
            title2: {
              value: 'BOM管理'
            },
            title3: {
              value: '硬件设计描述'
            }
          }
        },
        title3: {
          value: '产品验证与确认阶段',
          children: {
            title1: {
              value: 'VTP - QATP文档 - ..'
            },
            title2: {
              value: '测试自动化'
            }
          }
        },
        title4: {
          value: '固件设计',
          children: {
            title1: {
              value: 'STM32 无代码'
            },
            title2: {
              value: 'STM32与DL模型'
            }
          }
        },
        title5: {
          value: '文档管理',
          children: {
            title1: {
              value: '文档管理'
            }
          }
        },
        title6: {
          value: '公司管理',
          children: {
            title1: {
              value: '公司管理'
            },
            title2: {
              value: '人事管理'
            },
            title3: {
              value: '事件/咨询管理 - 邮件'
            },
            title4: {
              value: '事件/咨询管理 - WhatsApp'
            },
            title5: {
              value: '事件/咨询管理 - 电话'
            }
          }
        },
        title7: {
          value: '数据库查询',
          children: {
            title1: {
              value: 'NoSQL数据库'
            }
          }
        },
        title8: {
          value: 'Web服务',
          children: {
            title1: {
              value: 'AWS自动化'
            }
          }
        }
      }
    }
  },
  hi: {
    $vuetify: {
      examplesButton: 'उदाहरण',
      sidebar: {
        titleIntroduction: {
          value: 'परिचय'
        },
        title1: {
          value: 'प्रारंभिक परियोजना चरण',
          children: {
            title1: {
              value: 'सारांश'
            },
            title2: {
              value: 'लंबित मुद्दे'
            },
            title3: {
              value: 'कार्य उत्पत्ति'
            },
            title4: {
              value: 'परियोजना प्रस्ताव'
            },
            title5: {
              value: 'परियोजना आवश्यकताएँ'
            }
          }
        },
        title2: {
          value: 'हार्डवेयर PCB डिज़ाइन चरण',
          children: {
            title1: {
              value: 'हार्डवेयर डिज़ाइन'
            },
            title2: {
              value: 'BOM प्रबंधन'
            },
            title3: {
              value: 'हार्डवेयर डिज़ाइन विवरण'
            }
          }
        },
        title3: {
          value: 'उत्पाद सत्यापन और पुष्टि चरण',
          children: {
            title1: {
              value: 'VTP - QATP दस्तावेज़ - ..'
            },
            title2: {
              value: 'परीक्षण स्वचालन'
            }
          }
        },
        title4: {
          value: 'फर्मवेयर डिज़ाइन',
          children: {
            title1: {
              value: 'STM32 नो कोड'
            },
            title2: {
              value: 'STM32 डीएल मॉडल के साथ'
            }
          }
        },
        title5: {
          value: 'दस्तावेज़ प्रबंधन',
          children: {
            title1: {
              value: 'दस्तावेज़ प्रबंधन'
            }
          }
        },
        title6: {
          value: 'कंपनी प्रबंधन',
          children: {
            title1: {
              value: 'कंपनी प्रबंधन'
            },
            title2: {
              value: 'कर्मचारी प्रबंधन'
            },
            title3: {
              value: 'घटना/परामर्श प्रबंधन - ईमेल'
            },
            title4: {
              value: 'घटना/परामर्श प्रबंधन - WhatsApp'
            },
            title5: {
              value: 'घटना/परामर्श प्रबंधन - कॉल'
            }
          }
        },
        title7: {
          value: 'डेटाबेस क्वेरी',
          children: {
            title1: {
              value: 'NoSQL डेटाबेस'
            }
          }
        },
        title8: {
          value: 'वेब सेवाएं',
          children: {
            title1: {
              value: 'AWS स्वचालन'
            }
          }
        }
      }
    }
  },
  es: {
    $vuetify: {
      examplesButton: 'Ejemplos',
      resumen: {
        resumen: 'Obtener Resumen',
        tareas: 'Generar Tareas',
        seguimiento: 'Seguimiento Tiempo Real',
        analisis: 'Realizar Analisis',
        minutas: 'Generar Minutas',
        script: 'Carga el script de la Reunion',
        rutascript: 'Carga ruta del archivo con script de la Reunión',
        guardarResumen: 'Guardar Resumen',
        templateminutas: 'Selecciona Template Minutas',
        titulocardresumen: 'Carga script de la reunión o ruta con el script',
        promptanalisis: 'Indica que deseas preguntar o analizar de la reunión',
        proyectotareas: 'Selecciona proyecto donde quieres generar tarea',
        rutaseguimiento: 'Indica el enlace de la reunion en Teams'
      },
      stm32_dl_ia: {
        consulta_modificacion: 'CONSULTAR/MODIFICACION',
        entrenar: 'ENTRENAR',
        aceptarModelo: 'ACEPTAR MODELO',
        compilarC: 'COMPILAR EN C (microTVM)',
        generarPrograma: 'GENERAR PROGRAMA COMPLETO',
        compilarFlasheo: 'COMPILACION Y FLASHEO',
        mensajeRuta: 'Cargar ruta archivo datos entrenamiento',
        mensaProcedo: 'Descripción del proceso',
        mensajeCodigo: 'Codigo a Ejecutar',
        mensajePrompt: 'Descripcion del proyecto en Lenguaje Natural. Modelo deep learning integrado dentro de un STM32'
      },
      sidebar: {
        titleIntroduction: {
          value: 'Introducción'
        },
        title1: {
          value: 'Fase Inicial del Proyecto',
          children: {
            title1: {
              value: 'Seguimiento Reunión'
            },
            title2: {
              value: 'Puntos Pendientes Reunion'
            },
            title3: {
              value: 'Generacion Tareas'
            },
            title4: {
              value: 'Propuesta Proyecto'
            },
            title5: {
              value: 'Requisitos Proyecto'
            }
          }
        },
        title2: {
          value: 'Fase de Diseño de Hardware PCB',
          children: {
            title1: {
              value: 'Diseño HW'
            },
            title2: {
              value: 'Gestion BOM'
            },
            title3: {
              value: 'Descripcion Diseño HW'
            }
          }
        },
        title3: {
          value: 'Fase de Validación y Verificación del Producto',
          children: {
            title1: {
              value: 'Documentación VTP - QATP - ..'
            },
            title2: {
              value: 'Automatiozacion Test'
            },
            title3: {
              value: 'Lista Tests'
            }
          }
        },
        title4: {
          value: 'Diseño FW',
          children: {
            title1: {
              value: 'STM32 No Code'
            },
            title2: {
              value: 'STM32 con Modelo DL'
            }
          }
        },
        title5: {
          value: 'Gestion Documental',
          children: {
            title1: {
              value: 'Gestion Documental'
            }
          }
        },
        title6: {
          value: 'Gestion Compañia',
          children: {
            title1: {
              value: 'Gestion Compañia'
            },
            title2: {
              value: 'Gestion Personal'
            },
            title3: {
              value: 'Gestion Incid./Cons. Email'
            },
            title4: {
              value: 'Gestion Incid./Cons. WhatsApp'
            },
            title5: {
              value: 'Gestion Incid./Cons. Llamada'
            }
          }
        },
        title7: {
          value: 'Consulta BBDD',
          children: {
            title1: {
              value: 'BBDD NoSQL'
            }
          }
        },
        title8: {
          value: 'Servicios Web',
          children: {
            title1: {
              value: 'Automatizacion AWS'
            }
          }
        }
      }
    }
  }
}

let i18nLocale = 'en'

if (sessionStorage.getItem('i18nLocale')) {
  i18nLocale = sessionStorage.getItem('i18nLocale')
}

const i18n = new VueI18n({
  locale: i18nLocale,
  messages
})

const opts = {
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#409eff',
        secondary: '#54a8ff',
        accent: '#9c27b0',
        error: '#f44336',
        warning: '#ff5722',
        info: '#607d8b',
        success: '#4caf50'
      },
      dark: {
        primary: colors.blue.darken1
      }
    }
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }
}

const vuetify = new Vuetify(opts)
export { vuetify, i18n }
