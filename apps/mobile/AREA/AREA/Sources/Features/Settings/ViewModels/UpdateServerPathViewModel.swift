//
//  UpdateServerPathViewModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/11/2025.
//

internal import Combine
import Foundation

class UpdateServerPathViewModel: ObservableObject {
	@Published var serverScheme: String = AREA.SettingsUD.serverScheme
	@Published var serverHost: String = AREA.SettingsUD.serverHost
	@Published var serverPort: String =
		AREA.SettingsUD.serverPort.map(String.init) ?? ""
	@Published var isSaving: Bool = false
	@Published var errorMessage: String? = nil
	@Published var isErrorVisible: Bool = false

	init() {}

	func toggleIsSaving() {
		isSaving = !isSaving
	}

	func save() throws {
		if serverScheme != Constants.httpString
			&& serverScheme != Constants.httpsString
		{
			isErrorVisible = true
			errorMessage = String(
				localized: LocalizedStringResource.errorInvalidScheme
			)
			throw NSError(
				domain: "Invalid Scheme",
				code: 0,
				userInfo: nil
			)
		}
		if serverHost == "" {
			isErrorVisible = true
			errorMessage = String(localized: LocalizedStringResource.errorInvalidHost)
			throw NSError(domain: "Invalid Host", code: 0, userInfo: nil)
		}
		let port: Int?
		if serverPort.isEmpty {
			port = nil
		} else {
			// Validation si l'utilisateur entre un port manuel
			guard let parsedPort = Int(serverPort),
				parsedPort >= Constants.portMin && parsedPort <= Constants.portMax
			else {
				isErrorVisible = true
				errorMessage = String(
					localized: LocalizedStringResource.errorInvalidPort
				)
				throw NSError(domain: "Invalid Port", code: 0, userInfo: nil)
			}
			port = parsedPort
		}

		// Sauvegarde
		AREA.SettingsUD.serverHost = serverHost
		AREA.SettingsUD.serverScheme = serverScheme
		AREA.SettingsUD.serverPort = port
		isErrorVisible = false
		errorMessage = nil
	}

	func reset() {
		serverScheme = SettingsUD.serverScheme
		serverHost = SettingsUD.serverHost
		serverPort = AREA.SettingsUD.serverPort.map(String.init) ?? ""
		isErrorVisible = false
		errorMessage = nil
	}

	func createServerFullPath() -> String {
		"\(serverScheme)://\(serverHost):\(serverPort)"
	}
}
