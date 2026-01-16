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
}
