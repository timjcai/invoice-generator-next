function createSlug(input:string) {
    let slug = input.toUpperCase().split('').slice(0,5);
    return slug;
}