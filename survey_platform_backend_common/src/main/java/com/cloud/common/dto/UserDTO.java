package com.cloud.common.dto;

import com.cloud.common.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String userId;
    private String name;
    private String job;
    private int age;
    private String gender;
    private String phone;
    private String mailAddr;
    private UserRole userRole;
}
