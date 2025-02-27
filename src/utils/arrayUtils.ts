export const combinatdArrays = (array1, array2) => {
    return array1?.map(object1 => {
        const object2 = array2.find(obj => obj.nombre === object1.nombre);
        return { ...object1, ...object2 }
    })
}