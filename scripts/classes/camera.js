export default class Camera extends globalThis.InstanceType.Camera
{
	shakes = [];

	constructor()
	{
		super();
		this.anchor = {x: this.x, y: this.y};
	}
}
