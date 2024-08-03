
<template>
  <div class="project-management-case-study">
    <h1>Caso Estudio: Gestión de proyectos de electrónica utilizando Inteligencia Artificial</h1>
    <h2>Autor: Francisco Prats Quílez</h2>

    <section>
      <h3>1. Introducción</h3>
      <p>
        En la actualidad, la gestión de proyectos de electrónica se realiza de forma analítica por parte de un responsable del proyecto, quien debe abordar múltiples tareas, tales como la gestión del personal, la asignación de tareas, la estimación de tiempos o la generación de ofertas. Este enfoque tradicional puede ser propenso a errores humanos y a ineficiencias. A medida que un equipo de ingenieros comienza a trabajar en el desarrollo del producto electrónico, la complejidad y la carga de trabajo pueden aumentar significativamente. La Inteligencia Artificial (IA) ha emergido como una herramienta poderosa para optimizar este proceso, proporcionando soluciones innovadoras que mejoran la eficiencia y precisión en la gestión de proyectos. Este caso de estudio examina la implementación de un sistema de gestión de proyectos de electrónica utilizando IA, destacando sus beneficios, desafíos y resultados.
      </p>
    </section>

    <section>
      <h3>2. Objetivos del Proyecto</h3>
      <ul>
        <li>
          <strong>Automatización del Proceso:</strong> Implementar modelos y herramientas de IA para automatizar los procesos del proyecto, analizando la información de entrada y generando la información de salida de manera eficiente. Este proceso se gestionará a través de un agente de IA.
        </li>
        <div class="image-container">
          <img src="/img/automatizacion.png" alt="automatizacion">
      </div>
        <li>
          <strong>Integración con Plataformas de Gestión de Proyectos:</strong> Utilizar APIs y Python para controlar e integrar diferentes plataformas de gestión de proyectos de ingeniería, facilitando la sincronización y el flujo de información entre ellas.
        </li>
        <div class="image-container">
          <img src="/img/integracion.png" alt="integracion">
      </div>
        <li>
          <strong>Mejora de Modelos de Lenguaje Extenso (LLM):</strong> Abordar la no determinación de los modelos actuales mediante técnicas como la Generación Aumentada por Recuperación (RAG), mejorando la consistencia y precisión de los resultados generados por los LLM.
        </li>
      </ul>
    </section>

    <section>
      <h3>3. Metodología</h3>
      <h4>Fase Inicial del Proyecto: Análisis de Requisitos de Alto Nivel – Presentación de la Propuesta</h4>
      <p>
        En la fase inicial del proyecto, los clientes presentan un problema al cual debemos ofrecer una propuesta de solución. Diferentes agentes de IA pueden asistir en este proceso, generando resúmenes de las reuniones iniciales o proponiendo soluciones a los puntos pendientes.
      </p>
      <div class="image-container">
        <img src="/img/faseinicial.png" alt="faseinicial">
      </div>
      <h4>Fase de Diseño de Hardware PCB</h4>
      <p>
        Durante el desarrollo de una PCB, un ingeniero de hardware crea los requisitos de la PCB a partir de los requisitos generales del proyecto, para a partir de ahí, desarrollar la PCB. Este proceso incluye varias etapas, tales como la creación de diagramas de bloques o la documentación de la descripción del hardware. Métodos como la Generación Aumentada por Recuperación (RAG) pueden ayudar en la selección de componentes, el análisis de datasheets o la revisión de esquemáticos.
      </p>
      <div class="image-container">
        <img src="/img/hw.png" alt="hw">
      </div>
      <h4>Fase de Validación y Verificación del Producto</h4>
      <p>
        En las fases finales del proyecto, un ingeniero de Validación y Verificación (V&V) y un ingeniero de SW Test pueden utilizar diferentes agentes de IA para, por ejemplo, seleccionar la instrumentación de prueba o desarrollar el software de prueba en Python, basándose en los casos de prueba definidos.
      </p>
      <div class="image-container">
        <img src="/img/testing.png" alt="testing">
      </div>
    </section>

    <section>
      <h3>Conclusiones</h3>
      <p>
        La implementación de un sistema de gestión de proyectos de electrónica utilizando IA demostró ser una solución efectiva para abordar los desafíos tradicionales del sector. La capacidad de la IA para automatizar procesos, optimizar recursos y detectar errores proactivamente resultó en una mejora significativa en la eficiencia y calidad de los proyectos. Este caso de estudio subraya el potencial de la IA para transformar la gestión de proyectos de electrónica.
      </p>
    </section>

    <section>
      <h3>Futuras Direcciones</h3>
      <ul>
        <li>
          <strong>Expansión de Capacidades:</strong> A partir de la demostración citada, se podría extender el proyecto, abordando fases no citadas en un proyecto de electrónica, así como generalizar la interpretación inicial para adaptarlo a proyectos en áreas de producción o una metodología de trabajo predefinida.
        </li>
        <li>
          <strong>Investigación Continua:</strong> Mantener una investigación constante para explorar nuevas aplicaciones de IA en la gestión de proyectos de electrónica y adaptarse a las tendencias emergentes del mercado, así como las nuevas capacidades de los modelos.
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style scoped>
.project-management-case-study {
  font-family: Arial, sans-serif;
  margin: 20px;
}
.project-management-case-study h1, .project-management-case-study h2 {
  text-align: center;
}
.project-management-case-study section {
  margin-bottom: 20px;
}
</style>
