class Utils {
	//   Source: http://stackoverflow.com/questions/9496427/get-elements-by-attribute-when-queryselectorall-is-not-available-without-using-l#answer-15342661
	getElementsByAttribute(attribute, context) {
		const nodeList = (context || document).getElementsByTagName('*');
		const nodeArray = [];

		let node = null;
		let iterator = 0;

		while (node = nodeList[iterator++]) {
			if (node.hasAttribute(attribute)) nodeArray.push(node);
		}

		return nodeArray;
	}

	arrayFrom(list) {
		const array = [];
		for (let i = 0; i < list.length; i++) {
			array.push(list[i]);
		}

		return array;
	}
}

module.exports = Utils;