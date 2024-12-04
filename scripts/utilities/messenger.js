let singleton = null;

const subscribers = [];

export default class Messenger
{
	constructor()
	{
		if (!singleton) singleton = this;
		return singleton;
	}
	
	static Send(message)
	{
		for (subscriber of subscribers)
		{
			console.log(subscriber);
		}
	}
}