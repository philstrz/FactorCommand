// Implementation of enum in JS
export default function enumerated(array)
{
	const e = {};
	for (const elem of array)
	{
		e[elem] = elem;
	}
	return Object.freeze(e);
}