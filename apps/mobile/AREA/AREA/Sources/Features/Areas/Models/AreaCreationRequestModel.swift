//
//  AreaCreationRequestModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 14/01/2026.
//

import Foundation

struct AreaCreationRequest: Encodable {
	let name: String
	let description: String?
	let actionName: String
	let actionConfig: [String: String]
	let reactionName: String
	let reactionConfig: [String: String]
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
		actionConfig: [String: String],
		reactionName: String,
		reactionConfig: [String: String],
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
