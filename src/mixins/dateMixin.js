export default {
    methods: {
        utcToIndonesiaFormat(utcFormat) {
            var d = new Date(utcFormat);
            var option = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            return d.toLocaleDateString("id", option);
        }
    }
}