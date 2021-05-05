export default {
    methods: {
        convertSlugIntoTitleCase(slug) {
            let splitted = slug.split("-");
            let processed = splitted.map(item => {
                return item[0].toUpperCase() + item.slice(1);
            });
            return processed.join(" ");
        }
    }
}