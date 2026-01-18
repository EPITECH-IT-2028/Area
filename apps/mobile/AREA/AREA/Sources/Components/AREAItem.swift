//
//  AREAItem.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/01/2026.
//

import Foundation

struct AREAItem: Identifiable {
	let id: String
	let title: String
	let actionEventType: String?
	let reactionEventType: String?
	let actionServiceName: String
	let reactionServiceName: String
	let isActive: Bool
	let description: String
	let lastTriggered: String?

	init(from homeData: HomeDataModel) {
		self.id = homeData.id
		self.title = homeData.name
		self.isActive = homeData.isActive
		self.actionEventType = homeData.action.eventType
		self.reactionEventType = homeData.reaction.eventType
		self.actionServiceName = homeData.action.service.name
		self.reactionServiceName = homeData.reaction.service.name
		self.description = homeData.description
		self.lastTriggered = homeData.lastTriggered
	}

	init(
		id: String,
		title: String,
		actionEventType: String,
		reactionEventType: String,
		actionServiceName: String,
		reactionServiceName: String,
		isActive: Bool,
		description: String = "",
		lastTriggered: String = ""
	) {
		self.id = id
		self.title = title
		self.actionEventType = actionEventType
		self.reactionEventType = reactionEventType
		self.actionServiceName = actionServiceName
		self.reactionServiceName = reactionServiceName
		self.description = description
		self.lastTriggered = lastTriggered
		self.isActive = isActive
	}
}
