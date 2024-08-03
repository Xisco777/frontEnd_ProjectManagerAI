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
          value: 'Fase Inicial del Proyecto',
          children: {
            title1: {
              value: 'Resumen'
            },
            title2: {
              value: 'Puntos Pendientes'
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
              value: 'TestingIA'
            }
          }
        },
        title4: {
          value: 'Diseño FW',
          children: {
            title1: {
              value: 'STM32 IA No Code'
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
              value: 'Gestion Incidencias/Consultas'
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
          value: '基础',
          children: {
            title1: {
              value: '你好，世界'
            },
            title2: {
              value: '更新、添加、退出'
            },
            title3: {
              value: '生成、更新 I'
            },
            title4: {
              value: '选择元素并绑定数据'
            },
            title5: {
              value: '选择、添加、移除'
            }
          }
        },
        title2: {
          value: '树',
          children: {
            title1: {
              value: '树 I'
            },
            title2: {
              value: '树 II'
            },
            title3: {
              value: '树 III'
            },
            title4: {
              value: '树 IV'
            },
            title5: {
              value: '树 V'
            },
            title6: {
              value: '树 VI'
            },
            title7: {
              value: '树 VII'
            },
            title8: {
              value: '树 VIII'
            }
          }
        },
        title3: {
          value: '条形图',
          children: {
            title1: {
              value: '条形图 I'
            },
            title2: {
              value: '条形图 II'
            },
            title3: {
              value: '坐标轴 条形图'
            },
            title4: {
              value: '简单条形图'
            },
            title5: {
              value: '比例尺'
            }
          }
        },
        title4: {
          value: '缩放',
          children: {
            title1: {
              value: '可缩放的力导向图'
            },
            title2: {
              value: '缩放,显示节点文本'
            }
          }
        },
        title5: {
          value: '力导向图',
          children: {
            title1: {
              value: '力导向图 I'
            },
            title2: {
              value: '力导向图 II'
            },
            title3: {
              value: '力导向图 III'
            },
            title4: {
              value: '力导向图 关系'
            },
            title5: {
              value: '力导向图 布局 I'
            },
            title6: {
              value: '力导向图 布局 II'
            },
            title7: {
              value: '力导向图 布局 III'
            }
          }
        },
        title6: {
          value: '直方图',
          children: {
            title1: {
              value: '直方图 I'
            },
            title2: {
              value: '直方图 II'
            },
            title3: {
              value: '直方图 III'
            }
          }
        },
        title7: {
          value: '折线图',
          children: {
            title1: {
              value: '折线图 I'
            },
            title2: {
              value: '折线图 II'
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
