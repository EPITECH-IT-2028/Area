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
	let oauthUrl: URL?
	let actions: [ServiceAction]
	let reactions: [ServiceAction]
	var isAuthenticated: Bool?
}

struct ServiceAction: Decodable, Hashable, Identifiable {
	var id: String { name }
	let name: String
	let description: String
	let configSchema: ConfigSchemaInfo
}

struct ConfigSchemaInfo: Decodable, Hashable {
		let type: String
		let properties: [String: PropertyInfo]
		let required: [String]?
}

struct PropertyInfo: Decodable, Hashable {
		let type: String
		let description: String
		let format: String?
		let `default`: String?
}
