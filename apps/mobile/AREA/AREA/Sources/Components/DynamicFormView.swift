//
//  DynamicFormView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 13/01/2026.
//

import SwiftUI

struct DynamicFormView: View {
	let schema: ConfigSchemaInfo
	@Binding var values: [String: String]

	var body: some View {
		Form {
			ForEach(schema.properties.keys.sorted(), id: \.self) { key in
				if let property = schema.properties[key] {
					let isRequired = schema.required?.contains(key) ?? false

					Section {
						VStack(alignment: .leading, spacing: 8) {
							HStack(spacing: 4) {
								Text(property.description)
									.font(.subheadline)
									.foregroundColor(.secondary)

								if isRequired {
									Text("*")
										.foregroundColor(.red)
										.font(.subheadline)
										.bold()
								}
							}
							TextField(
								key,
								text: Binding(
									get: { values[key] ?? property.default ?? "" },
									set: { values[key] = $0 }
								)
							)
							.autocapitalization(.none)
							.textFieldStyle(RoundedBorderTextFieldStyle())
						}
						.padding(.vertical, 4)
					}
				}
			}
		}
	}
}
