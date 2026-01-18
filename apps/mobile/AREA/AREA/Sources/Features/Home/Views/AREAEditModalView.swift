//
//  AREAEditModalView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 18/01/2026.
//

import SwiftUI

struct AREAEditModal: View {
	let area: AREAItem
	@Binding var isPresented: Bool

	@State private var editedName: String
	@State private var editedDescription: String
	@State private var isActive: Bool
	@State private var isSaving = false
	@State private var showDeleteConfirmation = false
	@State private var errorMessage: String?
	@State private var showError = false

	init(area: AREAItem, isPresented: Binding<Bool>) {
		self.area = area
		self._isPresented = isPresented
		self._editedName = State(initialValue: area.title)
		self._editedDescription = State(initialValue: area.description)
		self._isActive = State(initialValue: area.isActive)
	}

	var body: some View {

		NavigationStack {
			Form {
				Section {
					VStack(alignment: .leading, spacing: 8) {
						Text(LocalizedStringResource.homeEditModalName)
							.font(.caption)
							.foregroundColor(.secondary)
						TextField(
							LocalizedStringResource.homeEditModalName,
							text: $editedName
						)
						.frame(minHeight: 30)
						.overlay(
							RoundedRectangle(cornerRadius: 8)
								.stroke(Color(.separator), lineWidth: 0.5)
						)
					}

					VStack(alignment: .leading, spacing: 8) {
						Text(LocalizedStringResource.homeEditModalDescription)
							.font(.caption)
							.foregroundColor(.secondary)

						TextEditor(text: $editedDescription)
							.frame(minHeight: 100)
							.overlay(
								RoundedRectangle(cornerRadius: 8)
									.stroke(Color(.separator), lineWidth: 0.5)
							)
					}
					.padding(.vertical, 4)
				} header: {
					Text(LocalizedStringResource.homeEditModalGeneralInformation)
				}

				Section {
					Toggle(isOn: $isActive) {
						HStack {
							Text(LocalizedStringResource.homeCardActive)
							Spacer()
							Text(
								isActive
									? LocalizedStringResource.homeCardActive
									: LocalizedStringResource.homeCardInactive
							)
							.font(.caption)
							.foregroundColor(isActive ? .green : .secondary)
						}
					}
					.tint(.green)
				} header: {
					Text(LocalizedStringResource.homeEditModalStatus)
				}

				Section {
					HStack(spacing: 16) {
						VStack(alignment: .leading, spacing: 4) {
							Text(LocalizedStringResource.homeCardAction)
								.font(.caption)
								.foregroundColor(.blue)
							Text(area.actionServiceName)
								.font(.body)
								.fontWeight(.medium)
							Text(area.actionEventType ?? "")
								.font(.caption)
								.foregroundColor(.secondary)
								.lineLimit(2)
						}
						.frame(maxWidth: .infinity, alignment: .leading)

						Image(systemName: "arrow.right")
							.foregroundColor(.secondary)

						VStack(alignment: .leading, spacing: 4) {
							Text(LocalizedStringResource.homeCardReaction)
								.font(.caption)
								.foregroundColor(.purple)
							Text(area.reactionServiceName)
								.font(.body)
								.fontWeight(.medium)
							Text(area.reactionEventType ?? "")
								.font(.caption)
								.foregroundColor(.secondary)
								.lineLimit(2)
						}
						.frame(maxWidth: .infinity, alignment: .leading)
					}
					.padding(.vertical, 8)
				} header: {
					Text(LocalizedStringResource.homeEditModalConfiguration)
				}

				Section {
					Button(role: .destructive) {
						showDeleteConfirmation = true
					} label: {
						HStack {
							Spacer()
							Text(LocalizedStringResource.homeEditModalDeleteAREA)
								.fontWeight(.semibold)
							Spacer()
						}
					}
				}
			}
			.onAppear {
				print(area)
			}
			.navigationTitle(LocalizedStringResource.homeEditModalEditAREA)
			.navigationBarTitleDisplayMode(.inline)
			.toolbar {
				ToolbarItem(placement: .cancellationAction) {
					Button(LocalizedStringResource.homeEditModalCancel) {
						isPresented = false
					}
				}

				ToolbarItem(placement: .confirmationAction) {
					if isSaving {
						ProgressView()
					} else {
						Button(LocalizedStringResource.homeEditModalSave) {
							saveChanges()
						}
						.fontWeight(.semibold)
						.disabled(editedName.isEmpty)
					}
				}
			}
			.alert(
				LocalizedStringResource.homeEditModalDeleteAREA,
				isPresented: $showDeleteConfirmation
			) {
				Button(LocalizedStringResource.homeEditModalCancel, role: .cancel) {}
				Button(LocalizedStringResource.homeEditModalDelete, role: .destructive)
				{
					deleteArea()
				}
			} message: {
				Text(
					LocalizedStringResource.homeEditModalSureToDelete
				)
			}
			.alert(LocalizedStringResource.errorTitle, isPresented: $showError) {
				Button(LocalizedStringResource.okTitle, role: .cancel) {}
			} message: {
				Text(
					errorMessage
						?? String(localized: LocalizedStringResource.errorHappenedTitle)
				)
			}
		}
	}

	private func saveChanges() {
		isSaving = true

		Task {
			do {
				//				let updateAction = UpdateAREAAction()
				//				try await updateAction.call(
				//					id: area.id,
				//					name: editedName,
				//					description: editedDescription,
				//					isActive: isActive
				//				)

				await MainActor.run {
					isSaving = false
					isPresented = false
				}
			} catch {
				await MainActor.run {
					isSaving = false
					errorMessage = error.localizedDescription
					showError = true
				}
			}
		}
	}

	private func deleteArea() {
		Task {
			do {
				//				let deleteAction = DeleteAREAAction()
				//				try await deleteAction.call(id: area.id)

				await MainActor.run {
					isPresented = false
				}
			} catch {
				await MainActor.run {
					errorMessage = error.localizedDescription
					showError = true
				}
			}
		}
	}
}
