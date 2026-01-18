//
//  HomeModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/01/2026.
//

import Foundation

struct HomeModel: Decodable {
	let success: Bool
	let message: String?
	let data: [HomeDataModel]
	let statusCode: Int?
}

struct HomeDataModel: Decodable, Identifiable {
	let id: String
	let userId: String
	let name: String
	let isActive: Bool
	let lastTriggered: String?
	let actionId: String
	let actionConfig: [String: HomeJSONValue]
	let reactionId: String
	let reactionConfig: [String: HomeJSONValue]
	let description: String
	let action: HomeActionModel
	let reaction: HomeActionModel
}

struct HomeActionModel: Decodable, Identifiable {
	let id: String
	let name: String
	let eventType: String?
	let service: HomeServiceModel

}

struct HomeServiceModel: Decodable {
	let name: String
}

enum HomeJSONValue: Decodable {
	case string(String)
	case number(Double)
	case bool(Bool)

	init(from decoder: Decoder) throws {
		let container = try decoder.singleValueContainer()

		if let x = try? container.decode(Double.self) {
			self = .number(x)
			return
		}
		if let x = try? container.decode(Bool.self) {
			self = .bool(x)
			return
		}
		if let x = try? container.decode(String.self) {
			self = .string(x)
			return
		}
		throw DecodingError.typeMismatch(
			HomeJSONValue.self,
			DecodingError.Context(
				codingPath: decoder.codingPath,
				debugDescription: "Type non supporté"
			)
		)
	}
}
