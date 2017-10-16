<template lang="html">
    <div>
        <v-card>
            <v-card-title>
                <span class="title">Editar Días de Aguinaldo</span>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-container grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs12 md4 lg4>
                            <v-text-field
                            label="Días"
                            required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 lg4>
                            <v-text-field
                            label="Inicio (Años)"
                            required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 lg4>
                            <v-text-field
                            label="Fin (Años)"
                            required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn>Actualizar</v-btn>
                <v-btn>Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
