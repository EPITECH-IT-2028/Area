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

enum HomeJSONValue: Codable, Hashable, Sendable {
	case string(String)
	case int(Int)
	case double(Double)
	case bool(Bool)
	case object([String: HomeJSONValue])
	case array([HomeJSONValue])
	case null

	init(from decoder: Decoder) throws {
		let container = try decoder.singleValueContainer()
		if container.decodeNil() {
			self = .null
			return
		}
		if let value = try? container.decode(String.self) {
			self = .string(value)
		} else if let value = try? container.decode(Int.self) {
			self = .int(value)
		} else if let value = try? container.decode(Double.self) {
			self = .double(value)
		} else if let value = try? container.decode(Bool.self) {
			self = .bool(value)
		} else if let value = try? container.decode([String: HomeJSONValue].self) {
			self = .object(value)
		} else if let value = try? container.decode([HomeJSONValue].self) {
			self = .array(value)
		} else {
			throw DecodingError.dataCorruptedError(
				in: container,
				debugDescription: "Unable to decode HomeJSONValue"
			)
		}
	}

	func encode(to encoder: Encoder) throws {
		var container = encoder.singleValueContainer()
		switch self {
		case .string(let value):
			try container.encode(value)
		case .int(let value):
			try container.encode(value)
		case .double(let value):
			try container.encode(value)
		case .bool(let value):
			try container.encode(value)
		case .object(let value):
			try container.encode(value)
		case .array(let value):
			try container.encode(value)
		case .null:
			try container.encodeNil()
		}
	}

	func hash(into hasher: inout Hasher) {
		switch self {
		case .string(let value):
			hasher.combine(0)
			hasher.combine(value)
		case .int(let value):
			hasher.combine(1)
			hasher.combine(value)
		case .double(let value):
			hasher.combine(2)
			hasher.combine(value)
		case .bool(let value):
			hasher.combine(3)
			hasher.combine(value)
		case .object(let value):
			hasher.combine(4)
			hasher.combine(value)
		case .array(let value):
			hasher.combine(5)
			hasher.combine(value)
		case .null:
			hasher.combine(6)
		}
	}
}
