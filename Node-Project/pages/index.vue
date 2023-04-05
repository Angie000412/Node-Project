

<template>

  <div>
    

      <v-container >
        <v-row>
          
          <v-col
            cols="12"
            md="6"
          >
            <v-card  elevation="18">
              <v-img src="images3.jfif" ></v-img>
              <v-card-title>Biogás</v-card-title>

              

              <v-card-text v-mutate.once="() => onMutate('card2')" >
                <p
                  v-for="n in +content + 2"
                  :key="n"
                  :class="n === +content + 2 && 'mb-0'"
                  
                >
                  El biogás es un gas renovable compuesto principalmente por metano y dióxido de carbono obtenido a partir de la degradación anaerobia sin oxígeno de residuos orgánicos. Es, según el Instituto para la Diversificación y Ahorro de la Energía de España, “la única energía renovable que puede usarse para cualquiera de las grandes aplicaciones energéticas: eléctrica, térmica o como carburante”.
            Se trata por tanto de transformar residuos ganaderos, agroindustriales y lodos de depuradoras de agua, pero también parte de los residuos domésticos. La basura se convierte así en la materia prima de una fuente de energía.
            .</p>
              </v-card-text>
            </v-card >
            <v-divider></v-divider>
           
              
            

          </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-card  elevation="18" >
                  <v-img src="v.png"></v-img>
                  <v-card-title>CEEPI</v-card-title>
    
                  <!-- <div class="text-h6 text-center pb-3">
                    Times Mutated: {{ card1 }}
                  </div> -->
    
                  <v-card-text v-mutate="() => onMutate('card1')">
                    <p
                      v-for="n in +content + 2"
                      :key="n"
                      :class="n === +content + 2 && 'mb-0'"
                     
                      
                    >
                    El Centro de Estudios de Energía y Procesos Industriales (CEEPI) de la Universidad de Sancti Spíritus, es un centro de estudios dedicado a realizar investigaciones, servicios científico técnicos y actividades de formación encaminadas a potenciar el desarrollo energético y agro-industrial sostenible en el territorio.
                Este centro  lleva a cabo el programa general para el desarrollo local en el uso del biogás como fuente  energética y de disminución de la contaminación ambiental,    encaminado a  desarrollar el proceso de producción de biogás en el territorio y su utilización eficiente con énfasis en la cocción de alimentos y la sustitución de combustibles fósiles en el sector agroindustrial, teniendo en cuenta los potenciales de residuos existentes, en aras de cerrar ciclo y contribuir al desarrollo socio económico del país.
                </p>
                  </v-card-text>
                </v-card>
              </v-col>
        </v-row>
      </v-container>
      
    </div>

 
</template>
<script>
  export default {
    data: () => ({
      content: false,
      
      
    }),

    methods: {
      onMutate (card) {
        this[card]++
      },
    },
    
  }
</script>
