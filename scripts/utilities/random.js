

export default class Random
{
	static choose(array, n=1, replacement=false)
	{
		// Check for errors
		if (n < 1) return;
		if (!replacement && n > array.length)
		{
			console.warn("Tried to pull " + n + " items from array of length " + array.length + " without replacement");
			return array;
		}
		
		if (n == 1)
		// Choose a single object from the array
		{
			const index = Random.integer(0, array.length - 1);
			return array[index];
		}
		else
		// Choose a subset of the array
		{
			const copy = [];
			const answer = [];
			for (const elem of array) copy.push(elem);
			
			for (let i = 0; i < n; i++)
			{
				const index = Random.integer(0, copy.length - 1);
				answer.push( copy[index] );
				if (!replacement) copy.splice(index, 1);
			}
			
			return answer;
		}
	}
	
	// Return an integer between a and b, inclusive
	static integer(a=0, b=1)
	{
		return Math.floor( Math.random() * (b - a + 1) + a );
	}
}