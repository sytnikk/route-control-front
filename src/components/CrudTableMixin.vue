<script>
export default {
  data: () => ({
    loading: true,
    saving: false,
    dialog: false,
    valid: true
  }),
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    close () {
      this.$refs.form.resetValidation()
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    }
  }
}
</script>
