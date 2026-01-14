//
//  AreaCreationViewModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 13/01/2026.
//

internal import Combine
import SwiftUI

class AreaCreationViewModel: ObservableObject {
	@Published var selectedActionService: Service?
	@Published var selectedAction: ServiceAction?
	@Published var actionConfigValues: [String: String] = [:]

	@Published var selectedReactionService: Service?
	@Published var selectedReaction: ServiceAction?
	@Published var reactionConfigValues: [String: String] = [:]

	@Published var isSubmitting = false
	@Published var errorMessage: String?
	@Published var success = false

	@Published var showAlert = false
	@Published var alertTitle = ""
	@Published var alertMessage = ""

	func validateActionConfig() -> Bool {
		guard let action = selectedAction else { return false }
		return validate(
			schema: action.configSchema,
			values: actionConfigValues
		)
	}

	func validateReactionConfig() -> Bool {
		guard let reaction = selectedReaction else { return false }
		return validate(
			schema: reaction.configSchema,
			values: reactionConfigValues
		)
	}

	func validateActionConfig(for action: ServiceAction) -> Bool {
		return validate(
			schema: action.configSchema,
			values: actionConfigValues
		)
	}

	func validateReactionConfig(for reaction: ServiceAction) -> Bool {
		return validate(
			schema: reaction.configSchema,
			values: reactionConfigValues
		)
	}

	private func validate(schema: ConfigSchemaInfo?, values: [String: String])
		-> Bool
	{
		guard let schema = schema else {
			return true
		}

		guard let requiredFields = schema.required, !requiredFields.isEmpty else {
			return true
		}

		for field in requiredFields {
			let value = values[field] ?? ""
			let trimmedValue = value.trimmingCharacters(in: .whitespacesAndNewlines)

			if trimmedValue.isEmpty {
				return false
			}
		}

		return true
	}

	func submitActionConfig(action: ServiceAction) -> Bool {
		guard validateActionConfig(for: action) else {
			errorMessage = "Veuillez remplir tous les champs requis"
			return false
		}

		selectedAction = action
		errorMessage = nil

		return true
	}

	func submitReactionConfig(reaction: ServiceAction) -> Bool {
		guard validateReactionConfig(for: reaction) else {
			errorMessage = "Veuillez remplir tous les champs requis"
			return false
		}

		selectedReaction = reaction
		errorMessage = nil

		return true
	}

	// ENVOI AU SERVEUR (A implémenter plus tard avec ton BuilderAPI)
	func createArea() async -> Bool {
		guard let action = selectedAction, let reaction = selectedReaction else {
			return false
		}

		isSubmitting = true

		// Exemple de payload à envoyer
		let payload: [String: Any] = [
			"action": action.name,
			"action_params": actionConfigValues,
			"reaction": reaction.name,
			"reaction_params": reactionConfigValues,
		]

		print("Envoi au back: \(payload)")

		// ⚠️ Ici: appel réseau...
		// Pour l'instant, on simule un succès
		// Remplace cette partie par ton vrai appel API

		// Simulation d'un délai réseau
		try? await Task.sleep(nanoseconds: 500_000_000)  // 0.5 secondes

		isSubmitting = false

		// 🔥 REMPLACE CETTE LIGNE par le résultat de ton appel API
		let apiSuccess = true  // Simule un succès, change selon ton API

		return apiSuccess
	}

	func resetAll() {
		selectedActionService = nil
		selectedAction = nil
		actionConfigValues = [:]

		selectedReactionService = nil
		selectedReaction = nil
		reactionConfigValues = [:]

		isSubmitting = false
		errorMessage = nil
		success = false
	}
}
