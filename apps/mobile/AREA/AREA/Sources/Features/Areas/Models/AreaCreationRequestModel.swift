//
//  AreaCreationRequestModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 14/01/2026.
//

import Foundation

enum JSONValue: Encodable {
	case string(String)
	case number(Double)
	case integer(Int)
	case bool(Bool)

	func encode(to encoder: Encoder) throws {
		var container = encoder.singleValueContainer()
		switch self {
		case .string(let x): try container.encode(x)
		case .number(let x): try container.encode(x)
		case .integer(let x): try container.encode(x)
		case .bool(let x): try container.encode(x)
		}
	}
}

struct AreaCreationRequest: Encodable {
	let name: String
	let description: String?
	let actionName: String
	let actionConfig: [String: JSONValue]
	let reactionName: String
	let reactionConfig: [String: JSONValue]
	let isActive: Bool

	enum CodingKeys: String, CodingKey {
		case name
		case description
		case actionName = "action_name"
		case actionConfig = "action_config"
		case reactionName = "reaction_name"
		case reactionConfig = "reaction_config"
		case isActive = "is_active"
	}

	init(
		name: String,
		description: String? = nil,
		actionName: String,
		actionConfig: [String: JSONValue],
		reactionName: String,
		reactionConfig: [String: JSONValue],
		isActive: Bool = true
	) {
		self.name = name
		self.description = description
		self.actionName = actionName
		self.actionConfig = actionConfig
		self.reactionName = reactionName
		self.reactionConfig = reactionConfig
		self.isActive = isActive
	}
}
