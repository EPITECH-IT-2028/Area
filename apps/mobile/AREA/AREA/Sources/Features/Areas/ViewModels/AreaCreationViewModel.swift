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
			errorMessage =
				"\(LocalizedStringResource.areaCreationErrorEmptyRequiredFieldTitle)"
			return false
		}

		selectedAction = action
		errorMessage = nil

		return true
	}

	func submitReactionConfig(reaction: ServiceAction) -> Bool {
		guard validateReactionConfig(for: reaction) else {
			errorMessage =
				"\(LocalizedStringResource.areaCreationErrorEmptyRequiredFieldTitle)"
			return false
		}

		selectedReaction = reaction
		errorMessage = nil

		return true
	}

	private func convertToTypedConfig(
		values: [String: String],
		schema: ConfigSchemaInfo?
	) -> [String: JSONValue] {
		var typedConfig: [String: JSONValue] = [:]

		guard let schema = schema else { return [:] }

		for (key, value) in values {
			if let property = schema.properties[key] {
				if property.type == "integer" {
					if let intValue = Int(value) {
						typedConfig[key] = .integer(intValue)
					} else {
						typedConfig[key] = .string(value)
					}
				}
				else if property.type == "number" {
					if let numberValue = Double(value) {
						typedConfig[key] = .number(numberValue)
					} else {
						typedConfig[key] = .string(value)
					}
				}
				else if property.type == "boolean" {
					let lowercasedValue = value.lowercased()
					if lowercasedValue == "true" || lowercasedValue == "yes" || lowercasedValue == "1" {
						typedConfig[key] = .bool(true)
					} else {
						typedConfig[key] = .bool(false)
					}
				}
				else {
					typedConfig[key] = .string(value)
				}
			} else {
				typedConfig[key] = .string(value)
			}
		}
		return typedConfig
	}

	func createArea() async -> Bool {
		guard let action = selectedAction, let reaction = selectedReaction else {
			return false
		}

		isSubmitting = true
		errorMessage = nil

		let typedActionConfig = convertToTypedConfig(
			values: actionConfigValues,
			schema: action.configSchema
		)
		let typedReactionConfig = convertToTypedConfig(
			values: reactionConfigValues,
			schema: reaction.configSchema
		)

		let request = AreaCreationRequest(
			name: "\(action.name) → \(reaction.name)",
			description: "",
			actionName: action.name,
			actionConfig: typedActionConfig,
			reactionName: reaction.name,
			reactionConfig: typedReactionConfig,
			isActive: true
		)

		let areaCreationAction = AreaCreationAction(parameters: request)
		let result = await areaCreationAction.call()

		isSubmitting = false

		switch result {
		case .success(_):
			success = true
			return true

		case .failure(let error, let statusCode):
			if statusCode == 401 {
				errorMessage =
					"\(LocalizedStringResource.areaCreationUnauthorizedTitle)"
			} else {
				errorMessage = error
			}

			success = false
			return false
		}
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
