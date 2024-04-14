// Function to group objects by a key
export function groupBy(array: any[], key: string) {
    return array.reduce((result, obj) => {
        // Extract the value of the key for grouping
        const keyValue = obj[key];

        // Check if the key already exists in the result
        if (!result[keyValue]) {
            // If not, create a new array for this key
            result[keyValue] = [];
        }

        // Push the object into the array for this key
        result[keyValue].push(obj);

        return result;
    }, {});
}