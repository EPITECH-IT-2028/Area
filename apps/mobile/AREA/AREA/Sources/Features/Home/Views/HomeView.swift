//
//  HomeView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/11/2025.
//

import SimpleKeychain
import SwiftUI

struct HomeView: View {
	@EnvironmentObject var authState: AuthState
	@EnvironmentObject var serviceStore: ServiceStore
	@ObservedObject var viewModel: HomeViewModel
	@State private var errorMessage: String?
	@State private var showError = false
	@State private var areas: [AREAItem] = []
	@State private var connectedServices: Int = 0
	@State private var selectedArea: AREAItem?

	var body: some View {
		let cards: [HomepageCard] = [
			HomepageCard(
				title: String(
					localized: LocalizedStringResource.homeConnectedServicesTitle
				),
				iconName: "globe",
				iconColor: .blue,
				backgroundColor: .blue,
				number: connectedServices
			),
			HomepageCard(
				title: String(localized: LocalizedStringResource.homeCreateAreasTitle),
				iconName: "bolt.fill",
				iconColor: .orange,
				backgroundColor: .orange,
				number: serviceStore.services.flatMap(\.actions).count
			),
		]

		NavigationStack {
			ScrollView {
				VStack {
					VStack(spacing: 16) {
						ForEach(cards) { card in
							HomepageCardView(card: card)
						}
					}.padding()
					ForEach(areas) { area in
						AREACardView(area: area)
							.onTapGesture {
								selectedArea = area
							}
					}
				}
				.padding(8)
			}
			.task {
				await loadAreas()
			}
			.refreshable {
				await loadAreas()
				do {
					_ = try await serviceStore.fetchServices()
				} catch {
					errorMessage = error.localizedDescription
					showError = true
				}
			}
			.alert(LocalizedStringResource.errorTitle, isPresented: $showError) {
				Button(LocalizedStringResource.okTitle, role: .cancel) {}
			} message: {
				Text(
					errorMessage
						?? String(localized: LocalizedStringResource.errorHappenedTitle)
				)
			}
			.navigationTitle(LocalizedStringResource.homeTitle)
			.background(Color.backgroundColor)
			.sheet(
				item: $selectedArea,
				onDismiss: {
					Task { await loadAreas() }
				}
			) { area in
				AREAEditModal(
					area: area,
					viewModel: viewModel
				)
			}
		}
	}

	@MainActor
	private func loadAreas() async {
		areas = await viewModel.retrieveAREA()
		do {
			connectedServices = try await viewModel.retrieveUserServiceByUserId()
		} catch {
			//
		}
	}
}
