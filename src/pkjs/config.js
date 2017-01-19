module.exports = [
	{
		"type": "heading",
		"defaultValue": "Watchface Configuration"
	},
	{
		"type": "text",
		"defaultValue": "Clay with Rocky.js"
	},
	{
		"type": "section",
		"items": [
			{
				"type": "heading",
				"defaultValue": "Colors"
			},
			{
				"type": "color",
				"messageKey": "bgColor",
				"defaultValue": "0x000000",
				"label": "Background Color"
			},
			{
				"type": "color",
				"messageKey": "cirColor",
				"defaultValue": "0xFFFFFF",
				"label": "Circle Color"
			},
			{
				"type": "color",
				"messageKey": "hourColor",
				"defaultValue": "0xFF0000",
				"label": "Hour Hand Color"
			},
			{
				"type": "color",
				"messageKey": "minColor",
				"defaultValue": "0xFF0000",
				"label": "Minute Hand Color"
			},
			{
				"type": "color",
				"messageKey": "dateColor",
				"defaultValue": "0xFF0000",
				"label": "Background Color"
			}
		]
	},
	{
		"type": "section",
		"items": [
			{
				"type": "heading",
				"defaultValue": "More Settings"
			},
			{
				"type": "toggle",
				"messageKey": "date",
				"label": "Show Date",
				"defaultValue": true
			}
		]
	},
	{
		"type": "submit",
		"defaultValue": "Save Settings"
	}
];