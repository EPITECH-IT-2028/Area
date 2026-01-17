//
//  HomeModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/01/2026.
//

import Foundation

struct HomeModel: Encodable {
	let success: Bool
	let message: String?
	let data: [HomeDataModel]
	let statusCode: Int?
}

struct HomeDataModel: Encodable {
	let id: Int
	let user_id: String
	let name: String
	let lastTriggered: String
	let actionId: String
	let actionConfig: [String: String]
	let reactionId: String
	let reactionConfig: [String: String]
	let description: String
	let action: HomeActionModel
	let reaction: HomeActionModel
}

struct HomeActionModel: Encodable {
	let id: String
	let name: String
	let eventType: String
	let service: HomeServiceModel
	
}

struct HomeServiceModel: Encodable {
	let name: String
}
