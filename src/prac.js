const intervals = [[1, 3], [2, 6], [7,9],[8, 10], [10, 18]];
// Output:[[1, 6], [7, 10], [15, 18]];

function mergeOverLapping(intervals){
    intervals.sort((a,b)=>a[0]-b[0]);

    let mergedArrayList = [intervals[0]];

    for(let i = 1; i < intervals.length; i++){
        let currentValue = intervals[i];
        let mergedList = mergedArrayList[mergedArrayList.length-1]

        if(currentValue[0] <= mergedList[1]){
            mergedList[1] = Math.max(currentValue[1], mergedList[1]);
        }else{
            mergedArrayList.push(currentValue);
        }
    }
    return mergedArrayList;
}


console.log(mergeOverLapping(intervals))