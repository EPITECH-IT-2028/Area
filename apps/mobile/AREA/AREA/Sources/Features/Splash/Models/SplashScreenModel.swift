//
//  SplashScreenModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 11/12/2025.
//

import Foundation

struct SplashScreenResponse: Decodable {
	var client: ClientInfo
	var server: ServerInfo
}

struct ClientInfo: Decodable {
	var host: String
}

struct ServerInfo: Decodable {
	var currentTime: Double
	var services: [Service]
}

struct Service: Decodable, Identifiable, Hashable {
	var id: String { name }
	let name: String
	let displayName: String
	let iconUrl: URL?
	let actions: [ServiceAction]
	let reactions: [ServiceAction]
}

struct ServiceAction: Decodable, Hashable {
	var id: String { name }
	let name: String
	let description: String
	let configSchema: ConfigSchemaInfo
}

struct ConfigSchemaInfo: Decodable, Hashable {
	let type: String
	let properties: PropertiesInfo
	let required: [String]?
}

struct PropertiesInfo: Decodable, Hashable {
	let from: FromInfo?
	let subjectContains: SubjectContainsInfo?
	let webhookUrl: WebhookUrl?
	let messageTemplate: MessageTemplate?
}

struct FromInfo: Decodable, Hashable {
	let type: String
	let description: String
}

struct SubjectContainsInfo: Decodable, Hashable {
	let type: String
	let description: String
}

struct WebhookUrl: Decodable, Hashable {
	let type: String
	let format: String
	let description: String
}

struct MessageTemplate: Decodable, Hashable {
	let type: String
	let `default`: String
	let description: String
}
