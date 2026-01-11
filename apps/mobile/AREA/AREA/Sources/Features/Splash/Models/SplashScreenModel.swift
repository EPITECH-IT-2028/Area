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

struct Service: Decodable, Identifiable {
	var id: String { name }
	var name: String
	var displayName: String
	var iconUrl: URL?
	var actions: [ServiceAction]
	var reactions: [ServiceAction]
}

struct ServiceAction: Decodable {
	var id: String { name }
	var name: String
	var description: String
}
