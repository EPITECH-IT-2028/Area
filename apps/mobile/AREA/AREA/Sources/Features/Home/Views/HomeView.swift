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
				}
				.padding(16)
			}
			.refreshable {
				do {
					_ = try await serviceStore.fetchServices()
				} catch {

				}
			}
			.navigationTitle(LocalizedStringResource.homeTitle)
			.background(Color(UIColor.systemGroupedBackground))
		}
	}
}
