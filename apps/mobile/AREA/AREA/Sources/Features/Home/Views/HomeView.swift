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
	@State private var selectedArea: AREAItem?
	@State private var showEditModal = false
	var body: some View {
		let stats: [HomepageCard] = [
			HomepageCard(title: "Services", number: serviceStore.services.count),
			HomepageCard(
				title: "Actions",
				number: serviceStore.services.flatMap(\.actions).count
			),
			HomepageCard(
				title: "Reactions",
				number: serviceStore.services.flatMap(\.reactions).count
			),
		]

		let columns = [
			GridItem(.flexible(), spacing: 16),
			GridItem(.flexible(), spacing: 16),
		]

		let totalCards = stats.count
		let isOdd = totalCards % 2 != 0
		let gridCount = isOdd ? totalCards - 1 : totalCards

		NavigationStack {
			ScrollView {
				VStack(spacing: 16) {
					LazyVGrid(columns: columns, spacing: 16) {
						ForEach(0..<gridCount, id: \.self) { index in
							HomepageCardView(item: stats[index], isSquare: true)
						}
					}
					if isOdd, let lastItem = stats.last {
						HomepageCardView(item: lastItem, isSquare: false)
					}
					ForEach(areas) { area in
						AREACardView(area: area)
							.onTapGesture {
								selectedArea = area
								showEditModal = true
							}
					}
				}
				.padding(16)
				.task {
					areas = await viewModel.retrieveAREA()
				}
			}
			.refreshable {
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
			.sheet(item: $selectedArea) { area in
				AREAEditModal(
					area: area,
					isPresented: Binding(
						get: { true },
						set: { if !$0 { selectedArea = nil } }
					)
				)
			}
		}
	}
}
