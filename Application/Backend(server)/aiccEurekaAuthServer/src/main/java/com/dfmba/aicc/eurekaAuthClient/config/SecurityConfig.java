package com.dfmba.aicc.eurekaAuthClient.config;


import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.csrf.CookieServerCsrfTokenRepository;

public class SecurityConfig extends SecurityConfigurerAdapter {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        return http
                .csrf(csrf -> csrf.csrfTokenRepository(
                        CookieServerCsrfTokenRepository.withHttpOnlyFalse()))
                .headers(headers -> headers.disable())
                .and()
                .authorizeExchange() // URI 별 권한 관리 설정
                .pathMatchers("/**").permitAll()
                /*.pathMatchers("/", "/css/**", "/images/**", "/js/**", "/h2-console/**", "/profile").permitAll()
                .pathMatchers("/api/v1/**").hasRole(Role.GUEST.name())
                .anyExchange().authenticated() // 설정된 값들 이외의 URI*/
                .and()
                .logout() // 로그아웃 설정 진입점
                .logoutSuccessUrl("/")
                .and()
                .oauth2Login()
                .userInfoEndpoint() // OAuth2 로그인 성공 이후 사용자 정보를 가져올 때의 설정을 담당
                .userService(customOAuth2UserService) // 로그인 성공 시 후속 조치를 진행할 UserService인터페이스 구현체 등록
                .and()
                .build();
    }

}

